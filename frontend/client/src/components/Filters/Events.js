import React, { useState } from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");

export default function Events(props) {
  const [state, setState] = useState(true);

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
    <section className={buttonClass}>
      <Button
        onSelect={event => {
          if(state)
          {
           setState(false);
            props.onSelect("events");
          }else
          {
             setState(true);
            props.onSelect("articles");
          }
        }}
        events
      >
        Events
      </Button>
    </section>
  );
}
