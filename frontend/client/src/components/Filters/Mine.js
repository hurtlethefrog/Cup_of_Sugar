import React from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");


export default function Mine(props) {
  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
      <section className={buttonClass}>
        <Button onSelect={event => props.onSelect("MINE")} mine>
          Mine
        </Button>
      </section>
  );
}
