import "antd/dist/antd.css"
import "./App.css";
import React, { useEffect, useState } from "react"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { Col, Row, Timeline } from "antd"
import TodoView from "./components/TodoListView";


function App() {
    const [todoList, setTodoList] = useState([{}])
    const [timeline, setTimeline] = useState([])
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
                {task.title} <small>({task._id})</small> {task.description}
              </Timeline.Item>
            ) : (
              <Timeline.Item
                dot={<MinusCircleOutlined />}
                color='blue'
                style={{ textDecoration: "initial" }}
              >
                {task.title} <small>({task._id})</small> {task.description}
              </Timeline.Item>
            );
        })

        setTimeline(timelineItems)
    }, [todoList])

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
      <div
        className='App list-group-item justify-content-center align-items-center mx-auto'
        style={{
          width: "400px",
          backgroundColor: "white",
          marginTop: "15px",
        }}
      >
        <div className='card-body'>
          <h5 className='card text-white bg-dark mb-3'>Add your task</h5>
          <span className='card-text'>
            <input
              className='mb-2 form-control titleIn'
              onChange={(event) => setTitle(event.target.value)}
              placeholder='Title'
            />
            <input
              className='mb-2 form-control desIn'
              onChange={(event) => setDesc(event.target.value)}
              placeholder='Description'
            />
            <button
              className='btn btn-outline-primary mx-2'
              style={{
                borderRadius: "50px",
                "fort-weight": "bold",
              }}
              onClick={addTodoHandler}
            >
              Add task
            </button>
          </span>
          <h5 className='card text-white bg-dark mb-3'>Your tasks</h5>
          <div>
            <TodoView todoList={todoList} />
          </div>
        </div>
        {/*TimeLine
        <Row style={{ marginTop: 50 }}>
          <Col span={14} offset={5}>
            <Timeline mode='alternate'>{timeline}</Timeline>
          </Col>
            </Row>
        */}
      </div>
    );
}

export default App
