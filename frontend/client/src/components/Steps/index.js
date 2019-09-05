import React from "react";
import "./index.scss";

import LoginRegOption from "./LoginRegOption";
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

export default function UserProcedure(props) {
  const { mode, transition, back } = useVisualMode(LOGINREGOPTION);

  return (
    <div className="UserProcedure">
      {mode === LOGINREGOPTION && (
        <LoginRegOption
          onLogin=""
          onRegister={() => transition(CURRENTLOCATION)}
        />
      )}
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
        <UserEntry onBack={() => back()} onNext={() => transition(READY)} />
      )}
      {mode === READY && <Ready onNext="Homepage" />}
    </div>
  );
}
