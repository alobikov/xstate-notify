import React from "react";
import { Tab, Segment } from "semantic-ui-react";
import Inbox from "./Inbox";
import Outbox from "./Outbox";
import { HomeMachineContext } from "../state";

const MessengerTabs = () => {
  const [current, send] = React.useContext(HomeMachineContext);

  const reducer = (acc, value) =>
    value.title?.includes("READ") ? acc : acc + 1;
  const cntNewMessages = current.context.messages.reduce(reducer, 0);

  const panes = [
    {
      menuItem: cntNewMessages !== 0 ? `Inbox (${cntNewMessages})` : "Inbox",
      render: () => (
        <Tab.Pane as="div" style={{ padding: "0px" }}>
          <Inbox />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Outbox",
      render: () => (
        <Tab.Pane as="div" style={{ padding: "0px" }}>
          <Outbox />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Chat",
      render: () => (
        <Tab.Pane attached={false}>Chat Content - To be done</Tab.Pane>
      ),
    },
  ];
  return (
    <Segment style={{ width: "100%", paddingRight: 5 }}>
      <Tab
        menu={{
          secondary: true,
          color: "blue",
          pointing: true,
        }}
        panes={panes}
      />
    </Segment>
  );
};

export default MessengerTabs;
