import React from "react";
import { homeMachine, HomeMachineContext } from "./state";
import { useMachine } from "@xstate/react";
import HomeBar from "./HomeBar";
import "./Home.css";
import SenderSemui from "./sender/SenderSemui";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";

import ContactsSemui from "./contacts/ContactsSemui";
import MessengerTabs from "./messenger/MessengerTabs";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { start } from "xstate/lib/actions";

const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    textAlign: "start",
    marginBlockStart: "0em",
  },
};

export default function Home({ user }) {
  console.log("*** Home rendered ***");
  // console.log(user.username);
  const machineWithContext = homeMachine.withContext({ user });
  const [current, send] = useMachine(machineWithContext);

  console.log(current.value); // state
  console.log(current.context); // context of homeMachine
  console.log(current.event);
  const handleReadMessages = () => {
    console.log("handelReadMessages()");
    send("READ_MESSAGES");
  };
  const addMessage = () => {
    send("ADD_MESSAGE");
  };

  return (
    <HomeMachineContext.Provider value={[current, send]}>
      <React.Fragment>
        <div className="layout">
          <HomeBar />
          <div className="wrapper">
            <div className="contacts">
              <ContactsSemui contacts={current.context.allContacts} />
            </div>
            <div className="sender">
              <SenderSemui />
            </div>
            <div className="messenger">
              <MessengerTabs />
            </div>
          </div>
        </div>
      </React.Fragment>
    </HomeMachineContext.Provider>
  );
}
