from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from app.models.TodoModel import TodoModel, UpdateTodoModel

router = APIRouter()

@router.post("/", response_description="Add new task")
async def create_task(request: Request, task: TodoModel = Body(...)):
    task = jsonable_encoder(task)
    new_task = await request.app.mongodb["todos"].insert_one(task)
    created_task = await request.app.mongodb["todos"].find_one(
        {"_id": new_task.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_task)


@router.get("/", response_description="List all todos")
async def list_todos(request: Request):
    todos = []
    # for doc in await request.app.mongodb["todos"].find().to_list(length=100):
    #     todos.append(doc)
    cursor = request.app.mongodb["todos"].find({})
    async for document in cursor:
        todos.append(TodoModel(**document))
    return todos


@router.get("/{id}", response_description="Get a single task")
async def show_task(id: str, request: Request):
    if (task := await request.app.mongodb["todos"].find_one({"_id": id})) is not None:
        return task

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.put("/{id}", response_description="Update a task")
async def update_task(id: str, request: Request, task: UpdateTodoModel = Body(...)):
    task = {k: v for k, v in task.dict().items() if v is not None}

    if len(task) >= 1:
        update_result = await request.app.mongodb["todos"].update_one(
            {"_id": id}, {"$set": task}
        )

        if update_result.modified_count == 1:
            if (
                updated_task := await request.app.mongodb["todos"].find_one({"_id": id})
            ) is not None:
                return updated_task

    if (
        existing_task := await request.app.mongodb["todos"].find_one({"_id": id})
    ) is not None:
        return existing_task

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.delete("/{id}", response_description="Delete Task")
async def delete_task(id: str, request: Request):
    delete_result = await request.app.mongodb["todos"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Task {id} not found")