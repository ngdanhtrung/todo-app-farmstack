import axios from "axios";
import React from "react";
import { Button, Card, Space ,Typography} from "antd";
import { DeleteOutlined ,CheckOutlined ,MinusOutlined} from "@ant-design/icons";


function TodoItem(props) {
  const urlRequest = `${process.env.REACT_APP_API_KEY}todos`;
  const { Text } = Typography;
  const deleteTodoHandler = (_id) => {
    axios.delete(`${urlRequest}/${_id}`)
      .then(res => console.log(res.data))
    props.getTodoList();
  }
  const completedTodoHandler = async (_id) => {
    await axios.put(`${urlRequest}/${_id}`, {
        completed: true
      })
      .then((res) => console.log(res));
    props.getTodoList();
  }
  return (
    <div>
      <Card title={props.todo.title} size='small' key={props.todo._id}>
        {props.todo.description}
        <br />
        <br />
        <Space>
          {props.todo.completed ? (
            <Button
              type='primary'
              shape='round'
              alight='right'
              icon={<CheckOutlined />}
            >
              Completed
            </Button>
          ) : (
            <Button
              onClick={() => completedTodoHandler(props.todo._id)}
              type='primary'
              shape='round'
              alight='right'
              icon={<MinusOutlined />}
            >
              Incomplete
            </Button>
          )}
          <Button
            onClick={() => deleteTodoHandler(props.todo._id)}
            danger
            type='primary'
            shape='circle'
            alight='right'
            icon={<DeleteOutlined />}
          ></Button>
          <Text italic>{ props.todo.deadline}</Text>
        </Space>
      </Card>
      <hr></hr>
    </div>
  );
}

export default TodoItem;