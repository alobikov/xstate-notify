import React from "react";
import "./Sender.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const adresatas = () => (
  <Button
    style={{ borderRadius: "15px", textTransform: "none" }}
    size="small"
    variant="outlined"
    disableElevation
    endIcon={<ClearIcon />}
  >
    Aleksej
  </Button>
);

export default function Sender() {
  const classes = useStyles();
  return (
    <Paper style={{ background: "#eee" }}>
      <div style={{ textAlign: "start", padding: "0.5rem" }}>
        <Typography>Send to: {adresatas()} </Typography>
      </div>
      <div
        style={{
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
          paddingTop: "0.5rem",
        }}
      >
        <TextField
          size="small"
          fullWidth
          multiline
          rows="3"
          label="Compose your message"
          id="outlined-size-small"
          defaultValue="Hi, please get back to office as soon as possible"
          variant="outlined"
        />
      </div>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
    </Paper>
  );
}
