import React, { useState } from "react";
import "./index.scss";

import LoginRegOption from "./LoginRegOption";
import Login from "./Login";
import CurrentLocation from "./CurrentLocation";
import AutoAddress from "./AutoAddress";
import ManualAddress from "./ManualAddress";
import Community from "./Community";
import UserEntry from "./UserEntry";
import Ready from "./Ready";

// import { Transition } from 'react-transition-group'
import { useVisualMode } from "../../hooks/useVisualMode";

const LOGINREGOPTION = "LOGINREGOPTION";
const CURRENTLOCATION = "CURRENTLOCATION";
const AUTOADDRESS = "AUTOADDRESS";
const MANUALADDRESS = "MANUALADDRESS";
const COMMUNITY = "COMMUNITY";
const USERENTRY = "USERENTRY";
const READY = "READY";
const LOGIN = "LOGIN";

export default function UserProcedure(props) {
  const { mode, transition, back } = useVisualMode(LOGINREGOPTION);

  return (
    <div className="UserProcedure">
      <header>
      </header>

      {mode === LOGINREGOPTION && (
        <LoginRegOption
          onLogin={() => transition(LOGIN)}
          onRegister={() => transition(CURRENTLOCATION)}
        />
      )}
      {mode === LOGIN && <Login onBack={() => back()} />}
      {mode === CURRENTLOCATION && (
        <CurrentLocation
          onBack={() => back()}
          onConfirm={() => {
            transition(AUTOADDRESS);
          }}
          onCancel={() => transition(MANUALADDRESS)}
        />
      )}
      {mode === AUTOADDRESS && (
        <AutoAddress
          onEdit={() => transition(MANUALADDRESS)}
          onBack={() => back()}
          onNext={() => transition(COMMUNITY)}
        />
      )}
      {mode === MANUALADDRESS && (
        <ManualAddress
          onBack={() => back()}
          onNext={() => transition(COMMUNITY)}
        />
      )}
      {mode === COMMUNITY && (
        <Community onBack={() => back()} onNext={() => transition(USERENTRY)} />
      )}
      {mode === USERENTRY && (
        <UserEntry
          onBack={() => back()}
          onNext={() => transition(READY)}
          setUser={props.setUser}
        />
      )}
      {mode === READY && <Ready onNext="/" />}
    </div>
  );
}
