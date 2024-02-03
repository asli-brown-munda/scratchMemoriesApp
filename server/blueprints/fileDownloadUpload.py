from flask import Blueprint
from models.Node import Node
from flask_injector import FlaskInjector, inject, singleton
from dao.s3Accessor import S3Accessor
from dao.nodeDAO import NodeHierarchy



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


