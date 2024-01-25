
from flask import Blueprint
from models.Node import Node
from flask_injector import FlaskInjector, inject, singleton
from dao.nodeDAO import NodeHierarchy

node_bp = Blueprint('file', __name__)

@node_bp.route("/list/<folder>")
@inject
def listNodes(nodeHierarchy: NodeHierarchy, folder):
	##authorize user
	items = nodeHierarchy.listNodes("1234", folder)
	nodes = []
	for item in items:
		nodes.append(Node(
			id = item['child_id'], 
			name = item['child_name'], 
			parent_name = item['parent_name'],
			parent_id = item['user_id#parent_id'], 
			size = item['meta_data']['size'],
			type = item['type']
			).to_json())
	return nodes