# Install dependencies

 pip3 install -r requirements.txt 

 # Running the server

 flask --app server run --debug [debug flag optional]

 # Available APIs

 ## List nodes

	To list nodes given a parent folder id

 ### Request
	http://localhost:5000/list/c2af9d83-5f94-484b-be18-f9ee25861243

 ### Response

 	[
  "{\"id\": \"50d3a3f7-ea7e-405e-8b25-f827e6602b11\", \"name\": \"xyz.png\", \"parent_name\": \"root\", \"parent_id\": \"c2af9d83-5f94-484b-be18-f9ee25861243\", \"metadata\": {\"bucket\": \"user11344\", \"key\": \"50d3a3f7-ea7e-405e-8b25-f827e6602b11#xyz.png\"}, \"type\": \"file\", \"created_at\": \"1707550677536\"}",
  "{\"id\": \"64b6a32e-b1e9-4a2a-9d5b-94779fbcd076\", \"name\": \"xyz1.png\", \"parent_name\": \"root\", \"parent_id\": \"c2af9d83-5f94-484b-be18-f9ee25861243\", \"metadata\": {\"size\": \"0\", \"bucket\": \"user11344\", \"key\": \"64b6a32e-b1e9-4a2a-9d5b-94779fbcd076#xyz1.png\"}, \"type\": \"file\", \"created_at\": \"1707551309245\"}"
   ]

## Download file

To download a file given id

### Request

http://localhost:5000/download/64b6a32e-b1e9-4a2a-9d5b-94779fbcd076

### Response

Singned url

https://user11344.s3.amazonaws.com/64b6a32e-b1e9-4a2a-9d5b-94779fbcd076%23xyz1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASNYF7R6RNW4757VS%2F20240210%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240210T080246Z&X-Amz-Expires=1000&X-Amz-SignedHeaders=host&X-Amz-Signature=0e578da0ef90c45e8c0c9511647b9bb67a2f721f624d61c71554c56caf1c19c2


## Intiate upload


Create a node for file given the parent folder(node) id and file name. It sends a signed url with upload permissions and the ndoe id as response

### Request

curl -H 'Content-Type: application/json' \
-d '{"parent_node_id":"c2af9d83-5f94-484b-be18-f9ee25861243", "node_name": "xyz3.png"}' \
 -X POST \
http://localhost:5000/initiate_upload


### Response
{
  "id": "3e8a151b-c90a-421f-9928-e39345b5ce98",
  "upload_url": "https://user11344.s3.amazonaws.com/3e8a151b-c90a-421f-9928-e39345b5ce98%23xyz3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASNYF7R6RNW4757VS%2F20240210%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240210T080610Z&X-Amz-Expires=1000&X-Amz-SignedHeaders=host&X-Amz-Signature=e95a793ca95b951ab5d49858e551167b3a0c50ceac7d9fe5c298904eb0e59c81"
}


#### Try uploading a file on the signed url with command:

curl --request PUT --upload-file ~/Downloads/bc4d975a-24d1-4a26-bc7c-afa4d9446e61.jpg 'https://user11344.s3.amazonaws.com/3e8a151b-c90a-421f-9928-e39345b5ce98%23xyz3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASNYF7R6RNW4757VS%2F20240210%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240210T080610Z&X-Amz-Expires=1000&X-Amz-SignedHeaders=host&X-Amz-Signature=e95a793ca95b951ab5d49858e551167b3a0c50ceac7d9fe5c298904eb0e59c81' 








