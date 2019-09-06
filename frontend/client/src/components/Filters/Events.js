import React, { useState } from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");

export default function Events(props) {
  // const [state, setState] = useState(true);

  const toggleButton = event => {
    if (props.categories["events"] === true) {
      props.toggleFilter("articles")
      props.onSelect("articles")
    } else {
      props.toggleFilter("events")
      props.onSelect("events")
    }
  }

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
    <section className={buttonClass}>
      <Button
        onSelect={toggleButton}
        events
      >
        Events
      </Button>
    </section>
  );
}
