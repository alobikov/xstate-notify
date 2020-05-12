import React from "react";
import { useMachine } from "@xstate/react";
import appMachine, { MachineContext } from "../state";
import App from "./App";

export default function App1() {
  console.log("App1 rendered -----------------");
  const [currentMachine, sendToMachine] = useMachine(appMachine, {
    devTools: true,
  });
  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <App />
    </MachineContext.Provider>
  );
}
