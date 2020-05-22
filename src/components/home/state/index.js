import React from "react";
import { Machine, assign, send } from "xstate";
import {
  readMessages as readMessagesParse,
  getAddressees as getAddresseesParse,
  deleteMessage as deleteMessageParse,
  createMessage as createMessageParse,
  readOutbox as readOutboxParse,
  addMessageTitle as addMessageTitleParse,
} from "../../../services/parse";

export const HomeMachineContext = React.createContext();
const readMessages = async (ctx, event) => {
  console.log("readMessages()");
  console.log(ctx.user.username);
  return await readMessagesParse(ctx.user.username);
};
const getAddressees = async (ctx, event) => {
  await new Promise((resolve) => setTimeout(resolve, 1));
  return await getAddresseesParse();
};
const getMessages = async (ctx, event) => {
  return await readMessagesParse(ctx.user.username);
};
const getOutbox = async (ctx, event) => {
  return await readOutboxParse(ctx.user.username);
};
const deleteInboxItem = async (ctx, event) => {
  await deleteMessageParse(event.payload);
  return ctx.messages.filter(({ objectId }) => objectId !== event.payload);
};

const deleteOutboxMessage = async (ctx, event) => {
  // first set title of the message on server to 'DEL'
  await addMessageTitleParse(event.payload, "DEL");
  // second remove message from context.outbox array
  return ctx.outbox.filter(({ objectId }) => objectId !== event.payload);
};

const markMessage = async (ctx, event) => {
  // first set title of the message on server to 'READ'
  await addMessageTitleParse(event.payload, "READ");
  // second update title of the message in local messages array
  return ctx.messages.map((message) => {
    if (message.objectId !== event.payload) return message;
    console.log("changing title");
    return { ...message, title: `${message.title} READ` };
  });
};

const dispatchMessage = async (ctx, event) => {
  const to = event.payload.to[0]; //TODO; now it is sending this message to first addressee
  const message = await createMessageParse(
    ctx.user.username,
    to,
    event.payload.body
  );
  // now update inbox if message sent to itself
  if (to === ctx.user.username) {
    ctx.messages = [message, ...ctx.messages];
  }
  // and finally update outbox
  ctx.outbox = [message, ...ctx.outbox];
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
      outbox: [],
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
                title: "DEL READ",
              },
            ],
            msgInForm: "",
            outbox: [],
            allContacts: [],
            addressees: [],
            clearBtnDis: true,
          }),
        ],
        invoke: {
          id: "getAddressees",
          src: getAddressees,
          onDone: {
            target: "msgLoading",
            actions: assign({ allContacts: (context, event) => event.data }),
          },
          onError: {
            target: "msgLoading",
            actions: assign({
              error: (context, event) => "there is problem fetching contacts",
            }),
          },
        },
      },
      // msgReadingStarted: {
      //   invoke: {
      //     id: "readMessages",
      //     src: readMessages,
      //     onDone: {
      //       target: "success",
      //       actions: assign({
      //         messages: (ctx, event) => {
      //           console.log(event.data);
      //           return event.data;
      //         },
      //       }),
      //     },
      //     onError: {
      //       target: "fail",
      //       actions: assign({
      //         error: (_, event) => {
      //           console.log(event.data);
      //           return event.data;
      //         },
      //       }),
      //     },
      //   },
      // }, //TODO redundant - subject to remove with some child fucntions
      msgLoading: {
        invoke: {
          id: "getMessages",
          src: getMessages,
          onDone: {
            target: "outboxLoading",
            actions: assign({ messages: (context, event) => event.data }),
          },
          onError: {
            target: "outboxLoading",
            actions: assign({
              error: (context, event) => "there is problem fetching messages",
            }),
          },
        },
      },
      outboxLoading: {
        invoke: {
          id: "getOutbox",
          src: getOutbox,
          onDone: {
            target: "ready",
            actions: assign({
              outbox: (ctx, event) => {
                console.log(event.data);
                return event.data;
              },
            }),
          },
          onError: {
            target: "ready",
            actions: assign({
              error: (context, event) => "there is problem fetching messages",
            }),
          },
        },
      },
      ready: {
        id: "ready",
        type: "parallel",
        states: {
          sender: {
            id: "sender",
            initial: "addrFieldEmpty",
            states: {
              addrFieldEmpty: {
                entry: assign({ clearBtnDis: true }),
                on: {
                  ADD_ADDRESSEE: {
                    target: "addrFillStarted",
                    actions: "addAddressee",
                  },
                },
              },
              addrFillStarted: {
                entry: assign({ clearBtnDis: false }),
                on: {
                  "": [
                    {
                      target: "addrFillCompleted",
                      cond: "addrLimit",
                    },
                  ],
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
                    { target: "addrFillStarted", cond: "duplicatedAddr" },
                    { actions: "addAddressee" },
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
              sendingMessage: {
                invoke: {
                  id: "dispatchMessage",
                  src: dispatchMessage,
                  onDone: {
                    target: "addrFieldEmpty",
                    actions: "clearMessage", // assign({ messages: (context, event) => event.data }),
                  },
                  onError: {
                    target: "addrFieldEmpty",
                    actions: assign({
                      error: (context, event) =>
                        "there is problem sending message",
                    }),
                  },
                },
              },
            },
            on: {
              CLEAR_MESSAGE: {
                target: ".addrFieldEmpty",
                actions: ["clearMessage"],
              },
              SEND_MESSAGE: {
                target: ".sendingMessage",
                actions: ["clearMessage"],
              },
              MESSAGE_DATA: { actions: "receiveTyping" },
              ADDR_COMPLETE: ".addrFillCompleted",
            },
          },
          messenger: {
            id: "messenger",
            initial: "inbox",
            states: {
              inbox: {},
              outbox: {},
              chat: {},

              deletingInboxItem: {
                invoke: {
                  id: "deleteInboxItem",
                  src: deleteInboxItem,
                  onDone: {
                    target: "inbox",
                    actions: assign({
                      messages: (context, event) => event.data,
                    }),
                  },
                  onError: {
                    target: "inbox",
                    actions: assign({
                      error: (context, event) =>
                        "there is problem fetching contacts",
                    }),
                  },
                },
              },
              deletingOutboxMessage: {
                invoke: {
                  src: deleteOutboxMessage,
                  id: "deleteOutboxMessage",
                  onDone: {
                    target: "outbox",
                    actions: assign({ outbox: (context, event) => event.data }),
                  },
                  onError: {
                    target: "outbox",
                    actions: assign({
                      error: (context, event) =>
                        "there is problem 'deleting' outbox item",
                    }),
                  },
                },
              },
              markingMessage: {
                invoke: {
                  src: markMessage,
                  id: "markMessage",
                  onDone: {
                    target: "inbox",
                    actions: assign({
                      messages: (context, event) => event.data,
                    }),
                  },
                  onError: {
                    target: "inbox",
                    actions: assign({
                      error: (context, event) =>
                        "there is problem setting message title",
                    }),
                  },
                },
              },
            },
            on: {
              DEL_INBOX_ITEM: ".deletingInboxItem",
              DEL_OUTBOX_MESSAGE: ".deletingOutboxMessage", //TODO
              MARK_MESSAGE_READ: ".markingMessage",
            },
          },
        },
      },

      success: {},
      fail: {},
    },
    // on: {
    //   READ_MESSAGES: ".msgReadingStarted",
    // },
  },
  {
    guards: {
      addrLimit: (ctx, event) => ctx.addressees.length === 3,
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
