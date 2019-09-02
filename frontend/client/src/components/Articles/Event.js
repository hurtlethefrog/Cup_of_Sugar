import React, {state, useState} from "react";

import "./styles.css";

export default function Event(props) {
  const [state, setState] = useState(false)

  return (
    <article className="box" onClick={event => setState(!state)}>
      <div>{props.title}</div>
      <div>{props.description}</div>
      {state && 
      <div>This is the expanded area</div>}
    </article>
  );
}