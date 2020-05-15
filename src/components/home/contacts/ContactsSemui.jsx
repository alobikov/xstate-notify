import React from "react";
import { Segment, List } from "semantic-ui-react";

export default function ContactsSemui() {
  const contacts = () => {
    return [
      "Aleksej Lobikov",
      "Pavel Troller",
      "Vadim Khudyakov",
      "Artiom Kondintcev",
      "Vladislav Ivanovich Petrov",
    ].map((c) => (
      <List.Item>
        <List.Icon name="user" size="small" color="grey"></List.Icon>
        <List.Content style={{ textAlign: "left" }}>{c}</List.Content>
      </List.Item>
    ));
  };

  return (
    <Segment style={{ padding: "10px", width: "100%" }}>
      <List divided relaxed>
        {contacts()}
      </List>
    </Segment>
  );
}
