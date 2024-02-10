
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import logging
from models.Node import Node

logger = logging.getLogger(__name__)

class NodeHierarchy:

    def __init__(self, dbResource):
        self.table = dbResource.Table("Node")


    def listNodes(self, parent_id):
        try:
            response = self.table.query(IndexName = "parent_id-created_at-index", 
                KeyConditionExpression=Key("parent_id").eq(parent_id)  & Key("created_at").gt(0))
        except ClientError as err:
            logger.error(
                "Couldn't query for files. why: %s: %s",
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise
        else:
            return response["Items"]

    def getNode(self, id):
        try:
            response = self.table.get_item(Key = {"id": id})
        except ClientError as err:
            logger.error(
                "Couldn't query for file. why: %s: %s",
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise
        else:
            return response["Item"]

    def createNode(self, user_id, node):
        try:
            response = self.table.put_item(Item={
            'id': node._id,
            'name': node._name,
            'parent_name': node._parent_name,
            'parent_id': node._parent_id,
            'meta_data': node._metadata,
            'created_at': node._created_at,
            'owner': user_id,
            'type': node._type
        })
        except ClientError as err:
            logger.error(
                "Couldn't query for file. why: %s: %s",
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise

    def updateNode(self, id, created_at, size):
        try:
            response = self.table.update_item(
                    Key = {"id": id},
                    UpdateExpression="set meta_data.size=:size, created_at=:created_at",
                    ExpressionAttributeValues={":size": int(size), ":created_at": int(created_at)},
                    ReturnValues= 'NONE'
        )
        except ClientError as err:
            logger.error(
                "Couldn't query for file. why: %s: %s",
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise


if __name__ == "__main__":
    try:
        fileInformation = FileInformation(boto3.resource("dynamodb", region_name="ap-south-1"))
        result = fileInformation.listFiles("1234", "6fe99b3e-ad86-46f8-98d0-8bf7719af539")
        print(result)
    except Exception as e:
        print(f"Something went wrong with the demo! Here's what: {e}")
