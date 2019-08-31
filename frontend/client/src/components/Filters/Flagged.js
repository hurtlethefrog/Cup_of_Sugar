import React from "react";

import Button from "../Button";

import "./styles.css";

let classnames = require("classnames");


export default function Flagged(props) {
  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
      <section className={buttonClass}>
        <Button onSelect={event => props.onSelect("FLAGGED")} flagged>
          Flagged
        </Button>
      </section>
  );
}
