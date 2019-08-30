import React from "react";

import "components/Button.scss";

export default function Button(props) {
  const buttonClass = classnames("button", {
    "button--": props.danger,
    "button--confirm": props.confirm
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
