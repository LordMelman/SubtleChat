from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from pydantic import BaseModel
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()


mongodb_password = os.getenv('SUBTLE_CLUSTER_PASS')
mongodb_base_uri = os.getenv('MONGODB_CONNECTION_URI')
mongodb_uri = mongodb_base_uri.replace('marmjohn:@', f'marmjohn:{mongodb_password}@')
print(mongodb_uri)
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = MongoClient(mongodb_uri)
    app.db = app.mongodb_client[os.environ["DB_NAME"]]
    print("Connected to the MongoDB database!")
    yield
    app.mongodb_client.close()
    print("Disonnected from the MongoDB database!")

app = FastAPI(lifespan=lifespan)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

llm = OpenAI(temperature=0.5)

systemPrompt = """
You are a helpful AI. Your goal is to help the human you are interacting with to find greater understanding of social situations. You value their emotional comfort above all else. You make it clear you cannot provide official medical advice.
Provide insight based on the user prompt.
User prompt: {user_prompt}
"""

prompt_template = PromptTemplate(input_variables=["user_prompt"], template=systemPrompt)
answer_chain = LLMChain(llm=llm, prompt=prompt_template)

class UserPrompt(BaseModel):
    user_prompt: str


@app.post("/get_insight/")
async def get_insight(user_prompt: UserPrompt):
    try:
        response = answer_chain.invoke(user_prompt.user_prompt)
        return {"insight": response.get("text")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

