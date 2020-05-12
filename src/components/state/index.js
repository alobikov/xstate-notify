import { assign, Machine } from "xstate";
import React from "react";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { parseInit, userSignUpAsync } from "../../services/parse";
import { readMessages as readMessagesParse } from "../../services/parse";

export const MachineContext = React.createContext();

const initParse = () => {
  parseInit();
};

const doLogin = async (context, event) => {
  console.log("doLogin() invoked");
  console.log(event);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // if (username !== "hello") {
  //   console.log("doLogin(): error");
  //   throw new Error("Wrong user name");
  // } else if (username === null) console.log("This is signIn");
  // else console.log("This is signUp");
  // return { username, email, password };
  const { objectId, username, email } = await userSignUpAsync(event);
  return {
    username,
    email,
    objectId,
  };
};

const appMachine = Machine({
  id: "app",
  initial: "init",
  // context hosts meta data
  context: {
    user: undefined,
    error: undefined,
    isLoading: false,
  },
  states: {
    init: {
      entry: initParse,
      on: { "": "auth" },
    },
    auth: {
      id: "auth",
      initial: "idle",
      states: {
        idle: {
          on: {
            LOGIN: "started",
            SIGNUP: "started",
          },
        },
        started: {
          entry: (context, event) => console.log("auth.started.entry"),
          invoke: {
            id: "doLogin",
            src: doLogin, // async function e.g. parse server fetch
            onDone: {
              target: "success",
              actions: assign({ user: (context, event) => event.data }),
            },
            onError: {
              target: "fail",
              actions: assign({ error: (_, event) => event.data }),
            },
          },
        },
        success: {
          on: { "": "home" },
        },
        fail: {
          on: {},
        },
        home: {
          id: "home",
          initial: "homeidle",
          states: {
            homeidle: {},
          },
        },
      },
    },
  },
});

export default appMachine;
