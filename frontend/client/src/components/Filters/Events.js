import React from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");

export default function Events(props) {

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
      <section className={buttonClass}>
        <Button onSelect={event => {props.onSelect("EVENTS")}} events>
          Events
        </Button>
      </section>
  );
}