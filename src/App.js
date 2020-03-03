import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import DungeonMap from "./components/DungeonMap";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/map" component={DungeonMap} />
      </Switch>
    </div>
  );
}

export default App;
