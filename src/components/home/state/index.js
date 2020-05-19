import React from "react";
import { Machine, assign } from "xstate";
import {
  readMessages as readMessagesParse,
  getAddressees as getAddresseesParse,
} from "../../../services/parse";

export const HomeMachineContext = React.createContext();
const readMessages = async (ctx, event) => {
  console.log("readMessages()");
  console.log(ctx.user.username);
  return await readMessagesParse(ctx.user.username);
};
const getAddressees = async (ctx, event) => {
  return await getAddresseesParse();
};

export const homeMachine = Machine(
  {
    // machine is instantiated .withContext({user}), so all other context demolished
    // use entry:  to set initial values
    id: "home",
    initial: "idle",
    context: {
      user: {},
      msgInForm: "",
      messages: [],
      allContacts: [],
      addressees: [],
      clearBtnDis: true,
    },
    states: {
      idle: {
        entry: [
          assign({
            messages: [
              {
                from: "Pavel Troller",
                body: "initially assigned message",
                objectId: "1",
                timestamp: "10 mins ago",
              },
            ],
            allContacts: [],
            addressees: [],
            sendBtnDis: true,
          }),
        ],
        invoke: {
          id: "getAddressees",
          src: getAddressees,
          onDone: {
            target: "addrFieldEmpty",
            actions: assign({ allContacts: (context, event) => event.data }),
          },
          onError: {
            target: "addrFieldEmpty",
            actions: assign({
              error: (context, event) => "there is problem fetching",
            }),
          },
        },
      },
      // initial: "addrFieldEmpty",

      addrFieldEmpty: {
        entry: assign({ clearBtnDis: true }),
        on: {
          ADD_ADDRESSEE: {
            target: "addrFillStarted",
            actions: assign({
              addressees: (ctx, { payload }) => [...ctx.addressees, payload],
            }),
          },
        },
      },
      addrFillStarted: {
        entry: assign({ clearBtnDis: false }),
        on: {
          DEL_ADDRESSEE: [
            {
              target: "addrFieldEmpty",
              cond: "addrEmpty",
              actions: ["delAddressee"],
            },
            {
              actions: ["delAddressee"],
            },
          ],
          ADD_ADDRESSEE: [
            {
              target: "addrFillStarted",
              cond: "duplicatedAddr",
            },
            {
              target: "addrFillCompleted",
              cond: "addrLimit",
            },
            {
              target: "addrFillStarted",
              actions: ["addAddressee"],
            },
          ],
        },
      },
      addrFillCompleted: {
        on: {
          DEL_ADDRESSEE: {
            target: "addrFillStarted",
            actions: ["delAddressee"],
          },
        },
      },

      on: {
        CLEAR_MESSAGE: {
          target: ".addrFieldEmpty",
          actions: ["clearMessage"],
        }, //TODO
        MESSAGE_DATA: { actions: "receiveTyping" },
        READ_MESSAGES: {
          target: "msg_reading_started",
        },
        SEND_MESSAGE: {
          actions: ["sendMessage", "clearMessage"],
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
      success: {
        on: {
          ADD_MESSAGE: {
            target: "idle",
            actions: assign({
              messages: (ctx, event) => [
                { body: "A message", objectId: "12345" },
                ...ctx.messages,
              ],
            }),
          },
        },
      },
      fail: {},
    },
  },
  {
    guards: {
      addrLimit: (ctx, event) => ctx.addressees.length > 2,
      addrEmpty: (ctx, event) => ctx.addressees.length === 1,
      duplicatedAddr: (ctx, event) => ctx.addressees.includes(event.payload),
    },
    actions: {
      delAddressee: assign({
        addressees: (ctx, event) => {
          console.log("delAddressee");
          console.dir(event);
          return ctx.addressees.filter(
            (addressee) => addressee !== event.payload
          );
        },
      }),
      addAddressee: assign({
        addressees: (ctx, { payload }) => [...ctx.addressees, payload],
      }),
      sendMessage: assign({
        messages: (ctx, event) => [
          ...ctx.messages,
          { body: ctx.msgInForm, objectId: ctx.msgInForm.slice(0, 5) },
        ],
      }),
      clearMessage: assign({ addressees: [], msgInForm: "" }),
      receiveTyping: assign({
        msgInForm: (ctx, event) => event.payload,
        clearBtnDis: false,
      }),
    },
  }
);
