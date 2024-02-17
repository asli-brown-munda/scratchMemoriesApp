import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import logging
from models.User import User

logger = logging.getLogger(__name__)

class UserDao:

    def __init__(self, dbResource):
        self.table = dbResource.Table("User")

    def createUser(self, user):
        try:
            response = self.table.put_item(Item=user.to_dict())
            logging.info("Put Item Successful %s", response)
        except ClientError as err:
            logger.error(
                "Couldn't create user. Error: %s: %s",
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise

    def getUserById(self, user_id):
        try:
            response = self.table.get_item(Key={"id": user_id})
            logging.info("Get User By ID Successful %s", response)
        except ClientError as err:
            logger.error(
                "Couldn't get user by id. Error: %s: %s",
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise
        else:
            item = response.get("Item")
            return User(**item) if item else None

    def getUserByEmail(self, email):
        try:
            response = self.table.query(
                IndexName="email_id-index",
                KeyConditionExpression=Key("email_id").eq(email)
            )
            logging.info("Get User By Email Successful %s", response)
        except ClientError as err:
            logger.error(
                "Couldn't get user by email. Error: %s: %s",
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise
        else:
            items = response.get("Items")
            return [User(**item) for item in items] if items else []

if __name__ == "__main__":
    try:
        userInformation = UserDao(boto3.resource("dynamodb", region_name="us-east-1"))
        # Example usage:
        # Creating a user
        user = User(
            id="12345",
            name="John Doe",
            picture_url="https://example.com/profile.jpg",
            locale="en_US",
            email_id="john@example.com",
            plan="free",
            storage_used=0,
            download_used=0
        )
        userInformation.createUser(user)

        # Retrieving a user by id
        retrieved_user = userInformation.getUserById("12345")
        print("Retrieved user by id:", retrieved_user)

        # Retrieving a user by email
        retrieved_user_by_email = userInformation.getUserByEmail("john@example.com")
        print("Retrieved user by email:", retrieved_user_by_email)
    except Exception as e:
        print(f"Something went wrong with the demo! Here's what: {e}")
