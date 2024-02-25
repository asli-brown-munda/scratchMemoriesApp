import json
from flask_login import UserMixin
import jsonpickle
from decimal import Decimal
from typing import Union

class User(UserMixin):
    """Class representing a user.

    Attributes:
        id (str): The id of the user.
        name (str): The name of the user.
        picture_url (str): The URL of the user's profile picture.
        locale (str): The locale setting of the user.
        email_id (str): The email address of the user.
        plan (str): The subscription plan of the user.
        storage_used (int): The amount of storage used by the user.
        download_used (int): The number of downloads used by the user.
        has_interest_in_premium_plans (bool): Indicates if the user has interest in premium plans.
    """

    def __init__(
        self,
        id: str,
        name: str,
        picture_url: str,
        locale: str,
        email_id: str,
        plan: str,
        storage_used: Union[int, Decimal],  # Accepts int or Decimal
        download_used: Union[int, Decimal],  # Accepts int or Decimal
        has_interest_in_premium_plans: bool = False,  # Default value is False
    ):
        """Initialize a User object.

        Args:
            id (str): The id of the user.
            name (str): The name of the user.
            picture_url (str): The URL of the user's profile picture.
            locale (str): The locale setting of the user.
            email_id (str): The email address of the user.
            plan (str): The subscription plan of the user.
            storage_used (int): The amount of storage used by the user.
            download_used (int): The number of downloads used by the user.
            has_interest_in_premium_plans (bool, optional): Indicates if the user has interest in premium plans. Defaults to False.
        """
        self.name = name
        self.picture_url = picture_url
        self.locale = locale
        self.email_id = email_id
        self.id = id
        self.plan = plan
        self.storage_used = int(storage_used)
        self.download_used = int(download_used)
        self.has_interest_in_premium_plans = has_interest_in_premium_plans

    def to_dict(self) -> dict:
        """Convert the User object to a dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "picture_url": self.picture_url,
            "locale": self.locale,
            "email_id": self.email_id,
            "plan": self.plan,
            "storage_used": self.storage_used,
            "download_used": self.download_used,
            "has_interest_in_premium_plans": self.has_interest_in_premium_plans,
        }

    def toJSON(self):
        return jsonpickle.encode(self, unpicklable=False)

    @classmethod
    def from_json(cls, json_str: str) -> "User":
        """Deserialize a JSON-formatted string to a User object."""
        data = json.loads(json_str)
        return cls(**data)

    def get_id(self):
        """Return the id of the user."""
        return str(self.id)
