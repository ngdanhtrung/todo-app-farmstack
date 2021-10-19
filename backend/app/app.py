import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from .routers.TodoRoute import router as TodoRoute
from .models.TodoModel import TodoModel
#app object
load_dotenv()
app = FastAPI()

origin = [os.getenv('REACT_CLIENT')]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origin,
  allow_credentials= True,
  allow_methods= ["*"],
  allow_headers= ["*"],
)

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.getenv('DB_HOST'))
    app.mongodb = app.mongodb_client[os.getenv('DB_NAME')]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

@app.get('/')
def read_root():
  return {"Ping":"Pong"}

app.include_router(TodoRoute, tags=["todos"], prefix="/todos")