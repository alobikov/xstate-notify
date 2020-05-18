import React from "react";
import { Tab, Segment } from "semantic-ui-react";
import Inbox from "./Inbox";

const panes = [
  {
    menuItem: "Inbox",
    render: () => (
      <Tab.Pane as="div" style={{ padding: "0px" }}>
        <Inbox />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Outbox",
    render: () => (
      <Tab.Pane attached={false}>Outbox Content - To be done</Tab.Pane>
    ),
  },
  {
    menuItem: "Chat",
    render: () => (
      <Tab.Pane attached={false}>Chat Content - To be done</Tab.Pane>
    ),
  },
];

const MessengerTabs = () => (
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

export default MessengerTabs;
