import React from "react";
import { Machine, assign } from "xstate";
import { readMessages as readMessagesParse } from "../../../services/parse";

export const MachineContext = React.createContext();
const readMessages = async (ctx, event) => {
  console.log("readMessages()");
  console.log(ctx.user.username);
  return await readMessagesParse(ctx.user.username);
};
export const homeMachine = Machine({
  id: "home",
  initial: "idle",
  context: {
    user: {},
    messages: [],
  },
  states: {
    idle: {
      on: {
        READ_MESSAGES: {
          target: "msg_reading_started",
        },
      },
    },
    msg_reading_started: {
      invoke: {
        id: "readMessages",
        src: readMessages,
        onDone: {
          target: "success",
          actions: assign({
            messages: (ctx, event) => {
              console.log(event.data);
              return event.data;
            },
          }),
        },
        onError: {
          target: "fail",
          actions: assign({
            error: (_, event) => {
              console.log(event.data);
              return event.data;
            },
          }),
        },
      },
    },
    success: {},
    fail: {},
  },
});
