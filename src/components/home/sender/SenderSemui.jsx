import React from "react";
import { Segment, Form, TextArea, Button, Icon } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
const SenderSemui = () => (
  <Segment>
    <Segment basic textAlign="left" style={{ padding: "0px" }}>
      Send to:
      <Button
        basic
        compact
        size="tiny"
        style={{ borderRadius: "1rem", marginLeft: "0.5rem" }}
      >
        <Icon name="delete"></Icon>
        Aleksej Lobikov
      </Button>
    </Segment>
    <Form>
      <TextArea rows={3} placeholder="Compose your message" />
    </Form>

    <Segment basic style={{ padding: "0px" }}>
      <Button disabled size="tiny" color="twitter">
        <Icon name="send" />
        Send
      </Button>
      <Button disabled size="tiny" color="google plus">
        <Icon name="delete" />
        Clear
      </Button>
    </Segment>
  </Segment>
);

export default SenderSemui;
