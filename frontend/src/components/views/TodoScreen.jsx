import "antd/dist/antd.css";
import "../../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Col, Row, Timeline, Card , Button, Input} from "antd";
import TodoView from "../TodoListView";

export const TodoScreen = () => {
  const [todoList, setTodoList] = useState([{}]);
  const [timeline, setTimeline] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const urlRequest = `${process.env.REACT_APP_API_KEY}todos`;

  const getTodoList = () => {
    axios.get(urlRequest).then((res) => {
      setTodoList(res.data);
      console.log(res.data);
    });
  };

  useEffect(getTodoList, []);

  useEffect(() => {
    const timelineItems = todoList.reverse().map((task) => {
      return task.completed ? (
        <Timeline.Item
          dot={<CheckCircleOutlined />}
          color='green'
          style={{ textDecoration: "line-through", color: "green" }}
        >
          <Card title={task.title} size='small'>
            {task.description}
          </Card>
        </Timeline.Item>
      ) : (
        <Timeline.Item
          dot={<MinusCircleOutlined />}
          color='blue'
          style={{ textDecoration: "initial" }}
        >
          <Card title={task.title} size='small'>
            {task.description}
          </Card>
        </Timeline.Item>
      );
    });

    setTimeline(timelineItems);
  }, [todoList]);

  const addTodoHandler = async () => {
    await axios
      .post(urlRequest, {
        title: title,
        description: desc,
      })
      .then((res) => console.log(res));
    getTodoList();
  };

  return (
    <Row type='flex'>
      <Col span={6} offset={2}>
        <Card title='Add your task'>
          <Input
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Title'
          />
          <br />
          <br />
          <Input.TextArea
            onChange={(event) => setDesc(event.target.value)}
            placeholder='Description'
          />
          <br />
          <br />
          <Button onClick={addTodoHandler} type='primary' shape='round'>
            Add Task
          </Button>
        </Card>
      </Col>
      <Col span={6} offset={1}>
        <Card title='Your task'>
          <div>
            <TodoView todoList={todoList} getTodoList={getTodoList} />
          </div>
        </Card>
      </Col>
      <Col span={6} offset={1}>
        <Card title='Time Line'>
            <Timeline mode='alternate'>{timeline}</Timeline>
        </Card>
      </Col>
    </Row>
  );
};
