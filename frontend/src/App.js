import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Routes } from "./configs/Routes";
import { MyRoute } from "./components/MyRoute";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
        <Router>
          <Navbar />
          <Switch>
            {Routes.map((item, index) => {
              return (
                <MyRoute
                  key={index}
                  path={item.path}
                  component={item.component}
                />
              );
            })}
          </Switch>
        </Router>
    </>
  );
}

export default App;