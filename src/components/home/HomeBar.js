import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";

export default function HomeBar() {
  return (
    <div>
      <Menu style={{ height: "3.2rem" }} attached="top" color="blue" inverted>
        <Dropdown item icon="list"></Dropdown>
        <Menu.Header
          as="div"
          style={{
            paddingTop: "0.5em",
            fontSize: "22px",
            color: "#ccc",
            margin: "0 auto",
          }}
          content="Notify"
        ></Menu.Header>
      </Menu>
    </div>
  );
}
