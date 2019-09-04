import React from "react";

// import "components/Button.scss";

export default function Button(props) {

  return (
    <button className="button" onClick={props.onSelect}>{props.children}</button>
    // for react router if we want filter shown in url
    // <Link to={`/${props.filter}`} className="button" onClick={props.onSelect}>{props.children}</Link>
  );
}
