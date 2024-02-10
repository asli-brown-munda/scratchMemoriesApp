import json


class Node:
	def __init__(self, id: str, name: str, parent_name: str, parent_id: str, type: str, created_at: int, metadata: map):
		"""Initialize a Node object.

		Args:
			id: str - id of the node
			name: str - user provided name of the node
			parent_name: str -  user provided name of the parent of the current node
			parent_id: str - Id of the parent of the current node
			size: int - size of the current node (Folder = 0 , File = size)
			type: str (File/Folder)
		"""
		self._id = id
		self._name = name
		self._parent_name = parent_name
		self._parent_id = parent_id
		self._metadata = metadata
		self._type = type
		self._created_at = created_at

	def to_json(self) -> str:
	    """Serialize the Node object to a JSON-formatted string."""
	    serialized_data = {key[1:] if key.startswith('_') else key: value for key, value in self.__dict__.items()}
	    return json.dumps(serialized_data, default=str)

	@classmethod
	def from_json(cls, json_str: str) -> 'Node':
	    """Deserialize a JSON-formatted string to a Node object."""
	    data = json.loads(json_str)
	    return cls(**data)