import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import DungeonMap from "./components/DungeonMap";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/map" component={DungeonMap} />
      </Switch>
    </div>
  );
}

export default App;
