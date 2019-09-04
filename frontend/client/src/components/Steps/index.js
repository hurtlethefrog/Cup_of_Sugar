import React from "react";

import LoginRegOption from "components/Steps/LoginRegOption";
import CurrentLocation from "components/Steps/CurrentLocation";
import AutoAddress from "components/Steps/AutoAddress";
import ManualAddress from "components/Steps/ManualAddress";
import Community from "components/Steps/Community";
import UserEntry from "components/Steps/UserEntry";
import Ready from "components/Steps/Ready";

import { useVisualMode } from "hooks/useVisualMode";
const LOGINREGOPTION = "LOGINREGOPTION";
const CURRENTLOCATION = "CURRENTLOCATION";
const AUTOADDRESS = "AUTOADDRESS";
const MANUALADDRESS = "MANUALADDRESS";
const COMMUNITY = "COMMUNITY";
const USERENTRY = "USERENTRY";
const READY = "READY";

export default function UserProcedure(props) {
  const { mode, transition, back } = useVisualMode(LOGINREGOPTION);

  return (
    <main className="">
      <header className=""></header>
      <section>
        <React.Fragment>
          {mode === LOGINREGOPTION && (
            <LoginRegOption
              onLogin="Login"
              onRegister={() => transition(CURRENTLOCATION)}
            />
          )}
          {mode === CURRENTLOCATION && (
            <CurrentLocation
              onConfirm={() => transition(AUTOADDRESS)}
              onCancel={() => transition(MANUALADDRESS)}
            />
          )}
          {mode === AUTOADDRESS && (
            <AutoAddress
              onEdit={() => transition(MANUALADDRESS)}
              onConfirm={() => transition(COMMUNITY)}
            />
          )}
          {mode === MANUALADDRESS && (
            <ManualAddress onConfirm={() => transition(COMMUNITY)} />
          )}
          {mode === COMMUNITY && (
            <Community onConfirm={() => transition(USERENTRY)} />
          )}
          {mode === USERENTRY && (
            <UserEntry onConfirm={() => transition(READY)} />
          )}
          {mode === READY && <Ready onConfirm="Homepage" />}
        </React.Fragment>
      </section>
    </main>
  );
}
