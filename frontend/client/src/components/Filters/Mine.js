import React, { useState } from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");

export default function Mine(props) {
  // const [state, setState] = useState(true)

  const toggleButton = event => {
    if (props.categories["mine"] === true) {
      props.toggleFilter("articles");
      props.onSelect("articles");
    } else {
      props.toggleFilter("mine");
      props.onSelect("mine");
    }
  };

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
    <section className={buttonClass}>
      <Button onSelect={toggleButton} notices>
        Mine
      </Button>
    </section>
  );
}
