import React, {useState} from "react";

import Button from "../Button";

import "./styles.scss";

let classnames = require("classnames");


export default function Mine(props) {
  const [state, setState] = useState(true)
  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
      <section className={buttonClass}>
        <Button onSelect={event => {
          if(state)
          {
           setState(false);
            props.onSelect("mine");
          }else
          {
             setState(true);
            props.onSelect("articles");
          }
        }} mine>
          Mine
        </Button>
      </section>
  );
}
