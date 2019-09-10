import React from "react";

import "./styles.scss";

let classnames = require("classnames");

export default function Notices(props) {
  // const [state, setState] = useState(true)

  const toggleButton = event => {
    if (props.categories["notices"] === true) {
      props.toggleFilter("articles");
      props.onSelect("articles");
    } else {
      props.toggleFilter("notices");
      props.onSelect("notices");
    }
  };

  const buttonClass = classnames("button", {
    "filter--selected": props.selected
  });

  return (
    <section className={buttonClass}>
      <button className="btn-notices" onClick={toggleButton} notices>
        Notices
      </button>
    </section>
  );
}