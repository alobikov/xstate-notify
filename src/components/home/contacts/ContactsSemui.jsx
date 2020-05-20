import React from "react";
import { Segment, List } from "semantic-ui-react";
import { HomeMachineContext } from "../state";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export default function ContactsSemui({ contacts }) {
  return (
    <Segment style={{ paddingRight: 5 }}>
      <SimpleBar style={{ maxHeight: "88vh" }}>
        <div
          style={{
            paddingLeft: "2",
            paddingRight: "7px",
            width: "100%",
            display: "block",
            // background: "lightblue",
          }}
        >
          <List animated divided relaxed>
            {contacts.map((contact) => (
              <ListItem addressee={contact.username} key={contact.objectId} />
            ))}
          </List>
        </div>
      </SimpleBar>
    </Segment>
  );
}
const ListItem = ({ addressee }) => {
  const styles = {
    icon: {
      paddingTop: "0.2rem",
    },
    item: {
      color: "black",
      textAlign: "left",
    },
  };
  const [current, send] = React.useContext(HomeMachineContext);
  const handleClick = (addressee) => {
    send({ type: "ADD_ADDRESSEE", payload: addressee });
  };
  return (
    <List.Item onClick={handleClick.bind(null, addressee)}>
      <List.Icon
        style={styles.icon}
        name="user"
        size="small"
        color="grey"
      ></List.Icon>
      <List.Content as="a" style={styles.item}>
        {addressee}
      </List.Content>
    </List.Item>
  );
};
