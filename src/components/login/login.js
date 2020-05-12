import React from "react";
import { MachineContext } from "../state";
import { Redirect } from "react-router-dom";

export default function Login() {
  const userRef = React.useRef();
  const passRef = React.useRef();
  const [machine, sendToMachine] = React.useContext(MachineContext);
  const { error } = machine.context;
  const doLogin = () => {
    const username = userRef.current.value;
    const password = passRef.current.value;
    sendToMachine("LOGIN", { username, password });
  };

  return (
    <>
      <h1>Login to your account</h1>
      <div>
        <input type="text" placeholder="username" ref={userRef}></input>
      </div>
      <div>
        <input type="password" placeholder="password" ref={passRef}></input>
      </div>
      {machine.matches("auth.fail") && <div>{error.toString()}</div>}
      <div>
        <button onClick={doLogin}>Login</button>
      </div>
      <div>{machine.matches("auth.success") && <Redirect to="/Home" />}</div>
    </>
  );
}
