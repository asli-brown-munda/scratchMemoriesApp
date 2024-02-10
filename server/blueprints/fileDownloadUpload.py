from flask import request, Blueprint
from models.Node import Node
from flask_injector import FlaskInjector, inject, singleton
from dao.s3Accessor import S3Accessor
from dao.nodeDAO import NodeHierarchy
import uuid
import time



file_bp = Blueprint('file', __name__)

@file_bp.route("/download/<id>")
@inject
def download(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy, id):
	##authorize user
	item = nodeHierarchy.getNode(id)
	bucket = item['meta_data']['bucket']
	key = item['meta_data']['key']
	return s3Accessor.generate_presigned_url_download(bucket, key)


@file_bp.route("/initiate_upload", methods=["POST"])
@inject
def initiate_upload(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy):
	##authorize user
	user_id = "user11344" ## TODO: pull it from auth
	parent_node_id = request.json.get("parent_node_id")
	node_name = request.json.get("node_name")
	item = nodeHierarchy.getNode(parent_node_id)
	parent_name = item['name']
	bucket = user_id 
	node_id = str(uuid.uuid4())
	key = str(node_id) + '#' + str(node_name)
	nodeHierarchy.createNode(user_id, Node(
			id = str(node_id),
			name = node_name,
			parent_id = parent_node_id,
			parent_name = parent_name,
			type = 'file',
			metadata = {'size': 0, 'bucket': bucket, 'key': key},
			created_at = 0
		))
	return {'id': node_id, 'upload_url':s3Accessor.generate_presigned_url_upload(bucket, key)}


@file_bp.route("/confirm_upload_status", methods=["POST"])
@inject
def confirm_upload_status(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy):
	##authorize user
	user_id = "user11344" ## TODO: pull it from auth
	id = request.json.get("id")
	item = nodeHierarchy.getNode(id)
	if(item['created_at'] > 0):
		raise Exception("filestatus is already confirmed")	
	key = str(id) + '#' + item['name']
	bucket = user_id
	created_at = round(time.time()*1000)
	size = s3Accessor.get_file_size(bucket, key)
	nodeHierarchy.updateNode(id, created_at, size)
	return {'status': 'Ok'}


