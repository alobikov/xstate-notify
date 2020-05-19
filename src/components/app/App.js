import React from "react";
import "./App.css";
import Home from "../home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MachineContext } from "../state";
import SignUp from "../login/SignUp";
import Login from "../login/login";
import PrivateRoute from "../privateroute";

function App() {
  const [currentMachine, sendToMachine] = React.useContext(MachineContext);
  console.log("App rendered ==============");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={SignUp} />
          {/* <Route path="/">
            <Home
            user={{
              username: "Aleksej Lobikov",
              email: "aleksej.lobikov@gmail.com",
              objectId: "aweRt1dr",
            }}
            />
          </Route> */}
          <Route path="/about" component={Login} />
          <PrivateRoute machine={currentMachine} path="/">
            <Home user={currentMachine.context.user} />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
