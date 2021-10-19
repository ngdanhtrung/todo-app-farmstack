from typing import Optional
import uuid
from pydantic import BaseModel, Field


class TodoModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    completed: bool = False

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "title": "My important task",
                "description" : "This is Description",
                "completed": False,
            }
        }


class UpdateTodoModel(BaseModel):
    title: Optional[str]
    description: Optional[str]
    completed: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "title": "My important task",
                "description" : "This is Description",
                "completed": True,
            }
        }
