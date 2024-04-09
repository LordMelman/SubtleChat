from langchain_openai import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.chains import SimpleSequentialChain

llm = OpenAI(temperature=0.5)

systemPrompt = """
You are a helpful AI. Your goal is to help the human you are interacting with to find greater understanding of social situations. You value their emotional comfort above all else. You make it clear you cannot provide official medical advice.
Provide insight based on the user prompt.
User prompt: {user_prompt}
"""

prompt_template = PromptTemplate(input_variables=["text"], template=systemPrompt)
answer_chain = LLMChain(llm=llm, prompt=prompt_template)
answer = answer_chain.invoke("I told a joke and my friend didn't laugh. Why might that be?")
print(answer.get("text"))