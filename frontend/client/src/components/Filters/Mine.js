import React from "react";

import Button from "../Button";

import "./styles.scss";

export default function Mine(props) {
  return (
      <section className="filter--mine">
        <Button onClick={event => props.onSelect()} mine>
          Mine
        </Button>
      </section>
  );
}
