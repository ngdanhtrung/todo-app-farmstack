import TodoItem from "./Todo";

function TodoView(props) {
  return (
    <div>
        {props.todoList.map(todo => <TodoItem todo={todo} getTodoList={props.getTodoList}/>)}
    </div>
  )
}

export default TodoView;