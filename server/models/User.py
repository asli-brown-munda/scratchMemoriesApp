import json
from flask_login import UserMixin


class User(UserMixin):
    """Class representing a user.

    Attributes:
        _id (str): The id of the user.
        _name (str): The name of the user.
        _picture_url (str): The URL of the user's profile picture.
        _locale (str): The locale setting of the user.
        _email_id (str): The email address of the user.
    """

    def __init__(
        self, id: str, name: str, picture_url: str, locale: str, email_id: str
    ):
        """Initialize a User object.

        Args:
            _id (str): The id of the user.
            name (str): The name of the user.
            picture_url (str): The URL of the user's profile picture.
            locale (str): The locale setting of the user.
            email_id (str): The email address of the user.
        """
        self.name = name
        self.picture_url = picture_url
        self.locale = locale
        self.email_id = email_id
        self.id = id

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    @classmethod
    def from_json(cls, json_str: str) -> "User":
        """Deserialize a JSON-formatted string to a User object."""
        data = json.loads(json_str)
        return cls(**data)

    def get_id(self):
        """Return the id of the user."""
        return str(self.id)
