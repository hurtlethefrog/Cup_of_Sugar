import React from "react";

// import "components/Button.scss";

export default function Button(props) {

  return (
    <button className="button is-primary is-focused" onClick={props.onSelect}>{props.children}</button>
  );
}
