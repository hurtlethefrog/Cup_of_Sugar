import React from "react";

import "./styles.scss";

let classnames = require("classnames");

export default function Wanted(props) {
  // const [state, setState] = useState(true)

  const toggleButton = event => {
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
      <button className="btn-wanted" onClick={toggleButton} wanted>
        Requests
      </button>
    </section>
  );
}
