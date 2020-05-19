import React from "react";
import { Segment, Form, TextArea, Button, Icon } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { HomeMachineContext } from "../state";
import { getAddressees } from "../../../services/parse";

export default function SenderSemui() {
  const styles = {
    adr_btn: {
      padding: ".5rem 0rem 0.5rem 0.7rem",
      borderRadius: "1rem",
      marginLeft: "0.5rem",
      fontWeight: 600,
    },
  };
  const [current, send] = React.useContext(HomeMachineContext);

  const handleSend = () => send("SEND_MESSAGE");
  const handleDelete = (addressee) =>
    send({ type: "DEL_ADDRESSEE", payload: addressee });
  const handleClear = async () => {
    send("CLEAR_MESSAGE");
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    send({ type: "MESSAGE_DATA", payload: event.target.value });
  };

  console.log(current.value);
  console.log(current.context);
  const addresseeButtons = (addressees) =>
    addressees.map((addressee) => (
      <Button
        onClick={handleDelete.bind(null, addressee)}
        style={styles.adr_btn}
        key={addressee}
        basic
        size="tiny"
      >
        {addressee}
        &nbsp; &nbsp;
        <Icon name="delete"></Icon>
      </Button>
    ));
  return (
    <Segment>
      <Segment basic textAlign="left" style={{ padding: "0px" }}>
        Send to:
        {addresseeButtons(current.context.addressees)}
      </Segment>
      <Form>
        <TextArea
          rows={3}
          placeholder="Compose your message"
          onChange={handleChange}
          value={current.context.msgInForm}
        />
      </Form>
      <Segment basic style={{ padding: "0px" }}>
        <Button
          disabled={!current.context.msgInForm || current.context.clearBtnDis}
          onClick={handleSend}
          size="tiny"
          color="twitter"
        >
          <Icon name="send" />
          Send
        </Button>
        <Button
          disabled={current.context.clearBtnDis}
          onClick={handleClear}
          size="tiny"
          color="google plus"
        >
          <Icon name="delete" />
          Clear
        </Button>
      </Segment>
      <pre style={{ textAlign: "start" }}>
        {JSON.stringify(current.context, null, 2)}
      </pre>
    </Segment>
  );
}
