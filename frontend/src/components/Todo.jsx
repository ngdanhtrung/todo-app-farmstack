import axios from "axios";
import React from "react";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoItem(props) {
  const urlRequest = `${process.env.REACT_APP_API_KEY}todos`;
  const deleteTodoHandler = (_id) => {
    axios.delete(`${urlRequest}/${_id}`).then((res) => console.log(res.data));
    props.getTodoList();
  };
  const completeTodoHandler = (_id) => {
    axios
      .put(`${urlRequest}/${_id}`, { completed: true })
      .then((res) => console.log(res.data));
    props.getTodoList();
  };
  return (
    <div className='d-flex flex-row justify-content-end mb-2 me-5'>
      <div className='mx-1'>
        <Tooltip title='Complete'>
          <Button
            onClick={() => completeTodoHandler(props.todo._id)}
            shape='circle'
            icon={<CheckOutlined />}
          />
        </Tooltip>
      </div>
      <div className='mx-1'>
        <Tooltip title='Delete'>
          <Button
            onClick={() => deleteTodoHandler(props.todo._id)}
            shape='circle'
            danger
            ghost
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default TodoItem;
