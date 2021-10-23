import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Routes } from "./configs/Routes";
import { MyRoute } from "./components/MyRoute";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.discordapp.com/attachments/845814665542893584/901387956563107860/background.jpg")`,
        backgroundRepeat: 'repeat',
        height:'1000px'
      }}
    >
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
    </div>
  );
}

export default App;