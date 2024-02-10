from flask import request, Blueprint
from models.Node import Node
from flask_injector import FlaskInjector, inject, singleton
from dao.s3Accessor import S3Accessor
from dao.nodeDAO import NodeHierarchy
import uuid



file_bp = Blueprint('file', __name__)

@file_bp.route("/download/<id>")
@inject
def download(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy, id):
	##authorize user
	items = nodeHierarchy.getNode(id)
	if(len(items) != 1):
		raise Exception("no file found!!")
	bucket = items[0]['meta_data']['bucket']
	key = items[0]['meta_data']['key']
	return s3Accessor.generate_presigned_url_download(bucket, key)


@file_bp.route("/initiate_upload", methods=["POST"])
@inject
def initiate_upload(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy):
	##authorize user
	user_id = "user11344" ## TODO: pull it from auth
	parent_node_id = request.json.get("parent_node_id")
	node_name = request.json.get("node_name")
	node_type = request.json.get("node_type")
	items = nodeHierarchy.getNode(parent_node_id)
	if(len(items) != 1):
		raise Exception("no file found!!")
	parent_name = items[0]['child_name']
	bucket = user_id if (node_type == 'file') else ""
	node_id = str(uuid.uuid4())
	key = (str(node_id) + '#' + str(node_name)) if (node_type == 'file') else ""
	nodeHierarchy.createNode(user_id, Node(
			id = str(node_id),
			name = node_name,
			parent_id = parent_node_id,
			parent_name = parent_name,
			type = node_type,
			size = 0,
			bucket = bucket,
			key = key
		))
	return {'id': node_id, 'upload_url':s3Accessor.generate_presigned_url_upload(bucket, key)}


# @file_bp.route("/initiate_upload")
# @inject
# def update_upload_status(s3Accessor: S3Accessor, nodeHierarchy: NodeHierarchy, id):
# 	##authorize user
# 	items = nodeHierarchy.getNode(id)
# 	if(len(items) != 1):
# 		raise Exception("no file found!!")
# 	bucket = items[0]['meta_data']['bucket']
# 	key = items[0]['meta_data']['key']
# 	return s3Accessor.generate_presigned_url_download(bucket, key)