
from flask import request, Blueprint
from models.Node import Node
from flask_injector import FlaskInjector, inject, singleton
from dao.nodeDAO import NodeHierarchy
import uuid
import time

node_bp = Blueprint('node', __name__)

@node_bp.route("/list/<folder>")
@inject
def listNodes(nodeHierarchy: NodeHierarchy, folder):
	##authorize user
	items = nodeHierarchy.listNodes(folder)
	nodes = []
	for item in items:
		nodes.append(Node(
			id = item['id'], 
			name = item['name'], 
			parent_name = item['parent_name'],
			parent_id = item['parent_id'], 
			metadata = item['meta_data'],
			type = item['type'],
			created_at = item['created_at']
			).to_json())
	return nodes

@node_bp.route("/create_folder", methods=["POST"])
@inject
def createFolder(nodeHierarchy: NodeHierarchy):
##authorize user
	user_id = "user11344" ## TODO: pull it from auth
	parent_id = request.json.get("parent_id")
	node_name = request.json.get("name")
	item = nodeHierarchy.getNode(parent_id)
	parent_name = item['name']
	node_id = str(uuid.uuid4())
	nodeHierarchy.createNode(user_id, Node(
			id = str(node_id),
			name = node_name,
			parent_id = parent_id,
			parent_name = parent_name,
			type = 'folder',
			metadata = {},
			created_at = round(time.time()*1000)
		))
	return {'id': node_id}
