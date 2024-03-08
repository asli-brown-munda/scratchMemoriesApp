
from flask import request, Blueprint
from models.Node import Node
from flask_injector import inject
from dao.nodeDAO import NodeHierarchy
import uuid
import time
from flask_login import login_required, current_user

node_bp = Blueprint('node', __name__)

@node_bp.route("/list/<folder>")
@inject
@login_required
def listNodes(nodeHierarchy: NodeHierarchy, folder):
	user_id = current_user.id
	items = nodeHierarchy.listNodes(folder, user_id)
	nodes = []
	for item in items:
		if 'parent_name' in item:
			parent_name = item['parent_name']
		else:
			parent_name = ""
		nodes.append(Node(
			id = item['id'], 
			name = item['name'], 
			parent_name = parent_name,
			parent_id = item['parent_id'], 
			metadata = item['meta_data'],
			type = item['type'],
			created_at = item['created_at']
			).to_json())
	return nodes

@node_bp.route("/create_folder", methods=["POST"])
@inject
@login_required
def createFolder(nodeHierarchy: NodeHierarchy):
##authorize user
	user_id = current_user.id
	parent_node_id = request.json.get("parent_id")
	if (parent_node_id == 'root'):
		parent_name = ""
		parent_node_id = user_id + "#" + "root"
	else:
		item = nodeHierarchy.getNode(parent_node_id)
		parent_name = item['name']
	
	node_name = request.json.get("name")
	node_id = str(uuid.uuid4())
	nodeHierarchy.createNode(user_id, Node(
			id = str(node_id),
			name = node_name,
			parent_id = parent_node_id,
			parent_name = parent_name,
			type = 'folder',
			metadata = {},
			created_at = round(time.time()*1000)
		))
	return {'id': node_id}
