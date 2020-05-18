import React from "react";
import { HomeMachineContext } from "../state";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { Segment, List, Icon, Checkbox } from "semantic-ui-react";

const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    textAlign: "start",
    marginBlockStart: "0em",
  },
};

export default function Inbox() {
  console.log("*** Messenger rendered ***");
  const [current, send] = React.useContext(HomeMachineContext);

  console.log(current.value); // state
  console.log(current.context); // context of homeMachine
  const handleReadMessages = () => {
    console.log("handelReadMessages()");
    send("READ_MESSAGES");
  };
  const addMessage = () => {
    send("ADD_MESSAGE");
  };
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
        <List divided relaxed style={{ marginRight: 6 }}>
          {current.context.messages.map((message) => (
            <div key="dfgsd">
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
              <ListItem
                message={message}
                key={(Math.random() * 10000).toString()}
              />
            </div>
          ))}
        </List>
      </div>
    </SimpleBar>
  );
}

function ListItem({ message }) {
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
  return (
    <Segment attached style={styles.flexContainer}>
      <div style={styles.flexConCol}>
        <div style={styles.from}>
          <strong>Pavel Troller Extremaler</strong>
        </div>
        <div style={styles.time}>10 mins ago</div>
      </div>
      <div style={styles.divider}></div>
      <div style={styles.body}>
        I did receive your message yersteday and was very excited
      </div>
      <div style={styles.divider}></div>
      <div style={styles.buttons}>
        <Checkbox className="checkbox"></Checkbox>
      </div>
      <div className="icon">
        <Icon name="trash alternate"></Icon>
      </div>
    </Segment>
  );
}
