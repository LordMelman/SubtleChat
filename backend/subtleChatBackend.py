from fastapi import FastAPI, HTTPException
from langchain_openai import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from pydantic import BaseModel

app = FastAPI()

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

