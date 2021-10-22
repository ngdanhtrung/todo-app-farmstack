import axios from "axios";
import React from "react";
import { Button, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";


function TodoItem(props) {
  const urlRequest = `${process.env.REACT_APP_API_KEY}todos`;
  const deleteTodoHandler = (_id) => {
    axios.delete(`${urlRequest}/${_id}`)
      .then(res => console.log(res.data))
    props.getTodoList();
  }
  return (
    <div>
      <Card title={props.todo.title} size='small'>
        {props.todo.description}
        <br />
        <br />
        <Button
          onClick={() => deleteTodoHandler(props.todo._id)}
          danger
          type='primary'
          shape='circle'
          alight='right'
          icon={<CloseOutlined />}
        ></Button>
      </Card>
      <hr></hr>
    </div>
  );
}

export default TodoItem;