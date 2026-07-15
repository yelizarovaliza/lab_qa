from langchain_google_genai import ChatGoogleGenerativeAI
from browser_use import Agent, Browser
from browser_use.llm import ChatGoogle
import asyncio
from dotenv import load_dotenv
import logging
import datetime
from prompts import *

logging.basicConfig(level=logging.INFO)

TIMESTAMP = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
load_dotenv()

browser = Browser()

llm_gemini_flash = ChatGoogle(
    model="gemini-flash-lite-latest",
    temperature=0.3,
)


async def main(llm, model_name, promt):
    logging.info(f"Running agent with model: {model_name}, scenario: {promt.scenario_name}")
    agent = Agent(
        task=promt.content,
        llm=llm,
        browser=browser,
        generate_gif=True,
        use_vision=True,
        save_conversation_path=f"e2elogs/{model_name}/{promt.scenario_name}/{TIMESTAMP}"
    )
    result = await agent.run()
    logging.info(f"Result for {promt.scenario_name}: {result}")
    input("Press Enter to close the browser...")
    await browser.kill()


if __name__ == '__main__':
    #asyncio.run(main(llm_gemini_flash, "gemini-flash-lite-latest", LOGIN_PROMT))
    asyncio.run(main(llm_gemini_flash, "gemini-flash-lite-latest", CATEGORY_SORT_PROMT))