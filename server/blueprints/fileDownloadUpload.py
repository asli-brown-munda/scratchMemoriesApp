from flask import request, Blueprint, make_response
from models.Node import Node
from flask_injector import inject
from dao.s3Accessor import S3Accessor
from dao.nodeDAO import NodeHierarchy
import uuid
import time
from flask_login import login_required, current_user
from dao.user_dao import UserDao
import logging

logger = logging.getLogger(__name__)


BASE_PLAN_CONSTANT_BYTES = 10**10 # 10 GB

file_bp = Blueprint('file', __name__)

@file_bp.route("/download/<id>")
@inject
@login_required
def download(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy, user_dao: UserDao, id):
	item = nodeHierarchy.getNode(id)
	root_folder = item['meta_data']['root_folder']
	key = item['meta_data']['key']
	download_bytes = s3Accessor.get_file_size(root_folder, key) 
	if (current_user.download_used + download_bytes > 2 * BASE_PLAN_CONSTANT_BYTES):
		logging.info(
			"Current User Exceeds the Download Limits. Current User Bytes: %s, Size of File %s, Max Bytes in Plan %s", 
			current_user.download_used, 
			download_bytes, 
			BASE_PLAN_CONSTANT_BYTES * 2)
		return make_response("", 422)
	user_dao.addDownloadUsage(current_user.id, download_bytes)
	return s3Accessor.generate_presigned_url_download(root_folder, key)


@file_bp.route("/delete/<id>", methods=["DELETE"])
@inject
@login_required
def delete(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy, user_dao: UserDao, id):
	user_id = current_user.id
	item = nodeHierarchy.getNode(id)
	if(item['type'] == 'folder'):
		items = nodeHierarchy.listNodes(id, user_id)
		if(len(items) > 0):
			raise Exception("Cannot delete folder as it is not empty")
		else:
			nodeHierarchy.deleteNode(id)
	else:		
		root_folder = item['meta_data']['root_folder']
		key = item['meta_data']['key']
		nodeHierarchy.deleteNode(id)
		deleted_bytes = s3Accessor.get_file_size(root_folder, key)
		s3Accessor.delete_file(root_folder, key)
		user_dao.addStorageUsage(user_id, -deleted_bytes)
	return {'status': 'Ok'}


@file_bp.route("/initiate_upload", methods=["POST"])
@inject
@login_required
def initiate_upload(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy):
	if (current_user.storage_used > BASE_PLAN_CONSTANT_BYTES):
		logging.info(
			"Current User Exceeds the Storage Limits. Current User Bytes: %s, Max Bytes in Plan %s", 
			current_user.storage_used, 
			BASE_PLAN_CONSTANT_BYTES)
		return make_response("", 422)
	user_id = current_user.id
	parent_node_id = request.json.get("parent_node_id")
	if (parent_node_id == 'root'):
		parent_name = ""
		parent_node_id = user_id + "#" + "root"
	else:
		item = nodeHierarchy.getNode(parent_node_id)
		parent_name = item['name']
	node_name = request.json.get("node_name")
	root_folder = user_id 
	node_id = str(uuid.uuid4())
	key = str(node_id) + '#' + str(node_name)
	nodeHierarchy.createNode(user_id, Node(
			id = str(node_id),
			name = node_name,
			parent_id = parent_node_id,
			parent_name = parent_name,
			type = 'file',
			metadata = {'size': 0, 'root_folder': root_folder, 'key': key},
			created_at = 0
		))
	return {'id': node_id, 'upload_url':s3Accessor.generate_presigned_url_upload(root_folder, key)}


@file_bp.route("/confirm_upload_status", methods=["POST"])
@inject
@login_required
def confirm_upload_status(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy, user_dao: UserDao):
	user_id = current_user.id
	id = request.json.get("id")
	item = nodeHierarchy.getNode(id)
	if(item['created_at'] > 0):
		raise Exception("filestatus is already confirmed")	
	key = str(id) + '#' + item['name']
	root_folder = user_id
	created_at = round(time.time()*1000)
	size = s3Accessor.get_file_size(root_folder, key)
	user_dao.addStorageUsage(user_id, size)
	if (current_user.storage_used + size > BASE_PLAN_CONSTANT_BYTES):
		logging.info(
			"Current User Exceeds the Storage Limits. Current User Bytes: %s, Size of File %s, Max Bytes in Plan %s", 
			current_user.storage_used, 
			size, 
			BASE_PLAN_CONSTANT_BYTES)
		return make_response("", 422)
	nodeHierarchy.updateNode(id, 'file', created_at, size)
	return {'status': 'Ok'}


