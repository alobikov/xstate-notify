import React from "react";
import { HomeMachineContext } from "../state";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { Segment, List, Icon, Checkbox } from "semantic-ui-react";

export default function Outbox() {
  console.log("*** Messenger rendered ***");
  const [current, send] = React.useContext(HomeMachineContext);

  console.log(current.value); // state
  console.log(current.context); // context of homeMachine

  return (
    <SimpleBar style={{ maxHeight: "58.6vh" }}>
      <div
        style={{
          paddingRight: "0px",
          margin: "0px",
          width: "100%",
          display: "block",
          // background: "red",
        }}
      >
        <List animated relaxed style={{ margin: 6 }}>
          {current.context.outbox.map((message) => (
            <ListItem message={message} key={message.objectId} send={send} />
          ))}
        </List>
      </div>
    </SimpleBar>
  );
}

function ListItem({ message, send }) {
  const toCamelCase = (str) =>
    str
      .split(/\s*[\s,]\s*/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const styles = {
    flexContainer: {
      display: "flex",
      flexFlow: "row",
      padding: "0px 4px",
    },
    flexConCol: {
      display: "flex",
      flexFlow: "column",
      textAlign: "start",
    },
    addressee: {
      flex: 1,
      fontSize: "0.9rem",
    },
    body: {
      flex: 1,
      textAlign: "start",
    },
    time: {
      color: "#999",
      fontSize: "0.8rem",
    },
    buttons: {
      // flexBasis: "content",
      margin: "auto",
    },
    divider: {
      borderLeft: "1px solid #bbb",
      margin: "5px 0px",
      marginLeft: "6px",
      marginRight: "6px",
    },
  };
  const handleDelete = async (objectId) => {
    send({ type: "DEL_OUTBOX_MESSAGE", payload: objectId });
    // this event means message 'title' on server should be set to 'DEL'
    // and meessage should be removed from context.outbox array
  };
  function listItemOn(e) {
    e.target.style.color = "red";
  }
  function listItemOff(e) {
    e.target.style.color = "grey";
  }
  return (
    <Segment className="listitem" attached style={styles.flexContainer}>
      <div style={styles.flexConCol}>
        <div style={styles.addressee}>
          <strong>to: {toCamelCase(message.to)}</strong>
        </div>
        <div style={styles.time}>{message.timestamp}</div>
      </div>
      <div style={styles.divider}></div>
      <div style={styles.body}>{message.body}</div>
      <div style={styles.divider}></div>
      <div style={styles.buttons}>
        <Checkbox className="checkbox"></Checkbox>
      </div>
      <div className="icon">
        <Icon
          onMouseEnter={listItemOn}
          onMouseOut={listItemOff}
          onClick={handleDelete.bind(null, message.objectId)}
          name="trash alternate"
        ></Icon>
      </div>
    </Segment>
  );
}
