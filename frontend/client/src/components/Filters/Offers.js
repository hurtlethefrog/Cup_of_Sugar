import React, { useState } from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");

export default function Offers(props) {
  // const [state, setState] = useState(true)

  const toggleButton = event => {
    if (props.categories["offers"] === true) {
      props.toggleFilter("articles");
      props.onSelect("articles");
    } else {
      props.toggleFilter("offers");
      props.onSelect("offers");
    }
  };

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
    <section className={buttonClass}>
      <Button onSelect={toggleButton} offers>
        Offers
      </Button>
    </section>
  );
}
