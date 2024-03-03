import argparse
import logging
from botocore.exceptions import ClientError
import requests
from botocore.client import Config

logger = logging.getLogger(__name__)

class S3Accessor:

    def __init__(self, s3_client):
        self._s3_client = s3_client
        self._bucket = 'memories'

    def get_file_size(self, root_folder, key):
        response = self._s3_client.head_object(Bucket= self._bucket, Key= root_folder + '/' + key)
        file_size = response['ContentLength']
        return file_size

    def generate_presigned_url_upload(self, root_folder, key):
        client_action = "put_object"
        url = self.generate_presigned_url(
            client_action, {"Bucket": self._bucket, "Key": root_folder + '/' + key}, 1000
        )
        return url

    def generate_presigned_url_download(self, root_folder, key):
        client_action = "get_object" 
        url = self.generate_presigned_url(
            client_action, {"Bucket": self._bucket, "Key": root_folder + '/' + key}, 1000
        )
        return url

    def delete_file(self, root_folder, key):
        try:
            response = self._s3_client.delete_object(Bucket=self._bucket, Key=root_folder + '/' + key)
        except Exception as e:
            logger.exception(
                "Couldn't delete the file %s '%s'.", key, client_method
            )
            raise

    def get_s3_folder_size(self, root_folder):
        total_size = 0

        paginator = self._s3_client.get_paginator('list_objects_v2')
        page_iterator = paginator.paginate(Bucket=self._bucket, Prefix=root_folder)

        for page in page_iterator:
            if 'Contents' in page:
                for obj in page['Contents']:
                    total_size += obj['Size']

        return total_size
        
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
