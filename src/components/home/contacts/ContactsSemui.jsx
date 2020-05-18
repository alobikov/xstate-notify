import React from "react";
import { Segment, List } from "semantic-ui-react";
import { HomeMachineContext } from "../state";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export default function ContactsSemui() {
  const contacts = [
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
    "Aleksej Lobikov",
    "Pavel Troller",
    "Vadim Khudyakov",
    "Artiom Kondintcev",
    "Vladislav Ivanovich Petrov",
  ];

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
          <List divided relaxed>
            {contacts.map((contact) => (
              <ListItem
                addressee={contact}
                key={(Math.random() * 10000).toString()}
              />
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
    <List.Item
      onClick={handleClick.bind(null, addressee)}
      key={Math.floor(Math.random() * 1000).toString()}
    >
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
