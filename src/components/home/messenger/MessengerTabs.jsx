import React from "react";
import { Tab, Segment } from "semantic-ui-react";
import Inbox from "./Inbox";
import Outbox from "./Outbox";
import { HomeMachineContext } from "../state";

const MessengerTabs = () => {
  const [current, send] = React.useContext(HomeMachineContext);

  /// this is reducer callback for counting sum of messages with 'READ' in title
  const reducer = (acc, value) =>
    value.title?.includes("READ") ? acc : acc + 1;
  const cntNewMessages = current.context.messages.reduce(reducer, 0);

  /// sends message to machine to change current state of Messenger
  const selectSwitch = [
    "SWITCH_TO_INBOX",
    "SWITCH_TO_OUTBOX",
    "SWITCH_TO_CHAT",
  ];
  const handleTabChange = (event, data) => {
    send(selectSwitch[data.activeIndex]);
  };
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
        onTabChange={handleTabChange}
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
