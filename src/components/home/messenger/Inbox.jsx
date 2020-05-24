import React from "react";
import { HomeMachineContext } from "../state";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { Segment, List, Icon, Checkbox } from "semantic-ui-react";
import { Hidden } from "@material-ui/core";

export default function Inbox() {
  console.log("*** Messenger rendered ***");
  const [current, send] = React.useContext(HomeMachineContext);

  console.log(current.value); // state
  console.log(current.context); // context of homeMachine

  return (
    <div>
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
            {current.context.messages.map((message) => (
              <ListItem message={message} key={message.objectId} send={send} />
            ))}
          </List>
        </div>
      </SimpleBar>
      <p>{current.context.messages.length}</p>
      <pre>{JSON.stringify(current.context.messages, null, 2)}</pre>
    </div>
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
    from: {
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
  const handleDelete = (objectId) => {
    send({ type: "DEL_INBOX_ITEM", payload: objectId });
  };
  const markRead = (objectId) => {
    send({ type: "MARK_MESSAGE_READ", payload: objectId });
  };
  function listItemOn(e) {
    e.target.style.color = "red";
  }
  function listItemOff(e) {
    e.target.style.color = "grey";
  }

  return (
    <Segment
      onClick={
        !message.title?.includes("READ")
          ? markRead.bind(null, message.objectId)
          : null
      }
      attached
      className="listitem"
      style={styles.flexContainer}
    >
      <div style={styles.flexConCol}>
        <div style={styles.from}>
          <strong>from: {toCamelCase(message.from)}</strong>
        </div>
        <div style={styles.time}>{message.timestamp}</div>
      </div>
      <div style={styles.divider}></div>
      <div style={styles.body}>
        {message.title?.includes("READ") ? (
          message.body
        ) : (
          <strong>{message.body}</strong>
        )}
      </div>
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
