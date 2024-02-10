
from flask import Blueprint
from models.Node import Node
from flask_injector import FlaskInjector, inject, singleton
from dao.nodeDAO import NodeHierarchy

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