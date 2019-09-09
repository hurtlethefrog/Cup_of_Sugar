import React, { useState } from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");

export default function Wanted(props) {
  // const [state, setState] = useState(true)

  const toggleButton = event => {
<<<<<<< HEAD
=======
    console.log(props.categories);
>>>>>>> master
    if (props.categories["requests"] === true) {
      props.toggleFilter("articles");
      props.onSelect("articles");
    } else {
      props.toggleFilter("requests");
      props.onSelect("requests");
    }
  };

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
    <section className={buttonClass}>
<<<<<<< HEAD
      <Button onSelect={toggleButton} wanted>
        Wanted
      </Button>
=======
      <button className="btn-wanted" onClick={toggleButton} wanted>
        Wanted
      </button>
>>>>>>> master
    </section>
  );
}
