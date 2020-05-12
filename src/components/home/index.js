import React from "react";
import { homeMachine } from "./state";
import { useMachine } from "@xstate/react";

export default function Home({ user }) {
  console.log("*** Home rendered ***");
  console.log(user.username);
  const machineWithContext = homeMachine.withContext({ user });
  const [current, send] = useMachine(machineWithContext);

  console.log(current.value); // state
  console.log(current.context); // context of homeMachine
  const handleReadMessages = () => {
    console.log("handelReadMessages()");
    send("READ_MESSAGES");
  };

  return (
    <div>
      <h1>Home1</h1>
      <button onClick={handleReadMessages}>read messages</button>
    </div>
  );
}
