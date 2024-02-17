import json
import botocore 
import botocore.session 
from aws_secretsmanager_caching import SecretCache, SecretCacheConfig 

client = botocore.session.get_session().create_client('secretsmanager', region_name='us-east-1')
cache_config = SecretCacheConfig(secret_refresh_interval = 86400)
cache = SecretCache( config = cache_config, client = client)

def get_secret(secret_name):
    secret_value = cache.get_secret_string(secret_name)
    return json.loads(secret_value)