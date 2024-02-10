import argparse
import logging
from botocore.exceptions import ClientError
import requests
from botocore.client import Config

logger = logging.getLogger(__name__)

class S3Accessor:

    def __init__(self, s3_client):
        self._s3_client = s3_client

    def get_file_size(self, bucket, key):
        response = self._s3_client.head_object(Bucket= bucket, Key= key)
        file_size = response['ContentLength']
        return file_size

    def generate_presigned_url_upload(self, bucket, key):
        client_action = "put_object"
        url = self.generate_presigned_url(
            client_action, {"Bucket": bucket, "Key": key}, 1000
        )
        return url

    def generate_presigned_url_download(self, bucket, key):
        client_action = "get_object" 
        url = self.generate_presigned_url(
            client_action, {"Bucket": bucket, "Key": key}, 1000
        )
        return url

    def generate_presigned_url(self, client_method, method_parameters, expires_in):
        """
        Generate a presigned Amazon S3 URL that can be used to perform an action.

        :param s3_client: A Boto3 Amazon S3 client.
        :param client_method: The name of the client method that the URL performs.
        :param method_parameters: The parameters of the specified client method.
        :param expires_in: The number of seconds the presigned URL is valid for.
        :return: The presigned URL.
        """
        try:
            url = self._s3_client.generate_presigned_url(
                ClientMethod=client_method, Params=method_parameters, ExpiresIn=expires_in
            )
            logger.info("Got presigned URL: %s", url)
        except ClientError:
            logger.exception(
                "Couldn't get a presigned URL for client method '%s'.", client_method
            )
            raise
        return url
