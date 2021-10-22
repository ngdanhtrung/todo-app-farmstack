import React, { useState }from "react";
import { Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import { Routes } from "../configs/Routes";

export const Navbar = () => {
  const [state, setState] = useState('mail')
  const { Title } = Typography;

  const handleClick = (event) => {
    console.log('click ', event);
    setState(event.key);
  };
    return (
      <Menu onClick={handleClick} selectedKeys={[state]} mode='horizontal'>
        {Routes.map((item, index) => (
          <Menu.Item key={index}>
            <Link
              to={item.path}
              className='menuItem'
              style={{ textDecoration: "none" }}
            >
              <Title level={4}>{item.label}</Title>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );
};
