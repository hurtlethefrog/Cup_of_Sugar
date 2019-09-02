import React from "react";

import "./styles.css";

export default function Notice(props) {
  return (
    <article className="box">
      <div>{props.title}</div>
      <div>{props.description}</div>
    </article>
  );
}