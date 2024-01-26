import json 
class User:
    """Class representing a user.

    Attributes:
        _name (str): The name of the user.
        _picture_url (str): The URL of the user's profile picture.
        _locale (str): The locale setting of the user.
        _email_id (str): The email address of the user.
    """

    def __init__(self, name: str, picture_url: str, locale: str, email_id: str):
        """Initialize a User object.

        Args:
            name (str): The name of the user.
            picture_url (str): The URL of the user's profile picture.
            locale (str): The locale setting of the user.
            email_id (str): The email address of the user.
        """
        self._name = name
        self._picture_url = picture_url
        self._locale = locale
        self._email_id = email_id

    @property
    def name(self) -> str:
        """Get the name of the user."""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        """Set the name of the user."""
        self._name = value

    @property
    def picture_url(self) -> str:
        """Get the URL of the user's profile picture."""
        return self._picture_url

    @picture_url.setter
    def picture_url(self, value: str) -> None:
        """Set the URL of the user's profile picture."""
        self._picture_url = value

    @property
    def locale(self) -> str:
        """Get the locale setting of the user."""
        return self._locale

    @locale.setter
    def locale(self, value: str) -> None:
        """Set the locale setting of the user."""
        self._locale = value

    @property
    def email_id(self) -> str:
        """Get the email address of the user."""
        return self._email_id

    @email_id.setter
    def email_id(self, value: str) -> None:
        """Set the email address of the user."""
        self._email_id = value

    def to_json(self) -> str:
        """Serialize the User object to a JSON-formatted string."""
        serialized_data = {key[1:] if key.startswith('_') else key: value for key, value in self.__dict__.items()}
        return json.dumps(serialized_data)

    @classmethod
    def from_json(cls, json_str: str) -> 'User':
        """Deserialize a JSON-formatted string to a User object."""
        data = json.loads(json_str)
        return cls(**data)