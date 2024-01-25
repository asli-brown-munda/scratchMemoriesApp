
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import logging

logger = logging.getLogger(__name__)

class FileInformation:

    def __init__(self, dbResource):
        self.table = dbResource.Table("FileInformation")


    def listFiles(self, userId, folder):
        try:
            response = self.table.query(KeyConditionExpression=Key("user_id#parent_id").eq(userId + "#" + folder))
        except ClientError as err:
            logger.error(
                "Couldn't query for files released in %s. why: %s: %s",
                year,
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise
        else:
            return response["Items"]



if __name__ == "__main__":
    try:
        fileInformation = FileInformation(boto3.resource("dynamodb", region_name="ap-south-1"))
        result = fileInformation.listFiles("1234", "6fe99b3e-ad86-46f8-98d0-8bf7719af539")
        print(result)
    except Exception as e:
        print(f"Something went wrong with the demo! Here's what: {e}")
