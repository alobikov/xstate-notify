import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: "100%",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  item: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemtext: {
    paddingTop: "0.2rem",
  },
}));

export default function Contacts() {
  const classes = useStyles();
  const handleClick = () => {
    console.log("addressee selected");
  };

  return (
    <List className={classes.root} subheader={<li />}>
      <ul className={classes.ul}>
        {[
          "Aleksej Lobikov",
          "Pavel Troller",
          "Vadim Khudyakov",
          "Artiom Kondintcev",
          "Vladislav Ivanovich Petrov",
        ].map((item) => (
          <ListItem
            style={{
              paddingRight: "5px",
              paddingLeft: "0px",
              paddingTop: "0px",
            }}
            className={classes.item}
            key={`item-${item}`}
          >
            {/* <ListItemText primary={`Item ${item}`} /> */}
            <Button
              style={{
                textTransform: "none",
                width: "100%",
                alignContent: "start",
              }}
              variant="outlined"
              size="small"
            >
              {item}
            </Button>
          </ListItem>
        ))}
      </ul>
    </List>
  );
}
