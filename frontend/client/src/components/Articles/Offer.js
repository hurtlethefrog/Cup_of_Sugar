import React from "react";

import "./styles.css";

export default function Offer(props) {
  
  return (
    <article>
      <div>{props.title}</div>
      <div>{props.description}</div>
    </article>
  );
}