import React from "react";

export default function Nav(props) {
  return (<nav>
    <div className="logo">
    <img src={props.logo}/>
    </div>
    <h1>Cup of Sugar</h1>
  </nav>);
}
