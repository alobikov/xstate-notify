import React from "react";
import { HomeMachineContext } from "../state";

const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    textAlign: "start",
    marginBlockStart: "0em",
  },
};

export default function Messenger() {
  console.log("*** Messenger rendered ***");
  const [current, send] = React.useContext(HomeMachineContext);

  console.log(current.value); // state
  console.log(current.context); // context of homeMachine
  const handleReadMessages = () => {
    console.log("handelReadMessages()");
    send("READ_MESSAGES");
  };
  const addMessage = () => {
    send("ADD_MESSAGE");
  };
  return (
    <div>
      <button onClick={handleReadMessages}>read messages</button>
      <button onClick={addMessage}>add a message</button>
      <ul style={styles.ul}>
        {current.context.messages.map((m) => (
          <li key={m.objectId}>{m.body}</li>
        ))}
      </ul>
    </div>
  );
}
