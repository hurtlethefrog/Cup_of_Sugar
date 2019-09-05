import React, {useState} from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");

export default function Wanted(props) {
  // const [state, setState] = useState(true)

  const toggleButton = event => {
    console.log(props.categories)
    if (props.categories["requests"] === true) {
      props.toggleFilter("articles")
      props.onSelect("articles")
    } else {
      props.toggleFilter("requests")
      props.onSelect("requests")
    }
  }

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
      <section className={buttonClass}>
        <Button onSelect={toggleButton} wanted>
          Wanted
        </Button>
      </section>
  );
}
