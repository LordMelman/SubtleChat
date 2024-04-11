from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

clusterPass = os.getenv('SUBTLE_CLUSTER_PASS')
uri = "mongodb+srv://marmjohn:"+ clusterPass +"@subtlecluster.lyw7ilz.mongodb.net/?retryWrites=true&w=majority&appName=SubtleCluster"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)