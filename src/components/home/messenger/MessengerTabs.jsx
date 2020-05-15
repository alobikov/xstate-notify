import React from "react";
import { Tab, Segment } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Inbox",
    render: () => (
      <Tab.Pane as="div" style={{ padding: "5px" }} attached={false}>
        Inbox Content
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Outbox",
    render: () => <Tab.Pane attached={false}>Outbox Content</Tab.Pane>,
  },
  {
    menuItem: "Chat",
    render: () => <Tab.Pane attached={false}>Chat Content</Tab.Pane>,
  },
];

const MessengerTabs = () => (
  <Segment style={{ width: "100%" }}>
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
