import axios from "axios";
import React from "react";
import { Button } from "antd"
import { CloseOutlined } from "@ant-design/icons";


function TodoItem(props) {
  const urlRequest = `${process.env.REACT_APP_API_KEY}todos`;
  const deleteTodoHandler = (_id) => {
    axios.delete(`${urlRequest}/${_id}`)
    .then(res=> console.log(res.data))
  }
  return (
    <div>
      <p>
        <span style={{ fontWeight: "bold, underline" }}>
          {props.todo.title} :
        </span>
        {props.todo.description}
        <Button
          onClick={() => deleteTodoHandler(props.todo._id)}
          danger
          type='primary'
          shape='circle'
          icon={<CloseOutlined />}
        >
        </Button>
        <hr></hr>
      </p>
    </div>
  );
}

export default TodoItem;