import React from "react";

import Button from "../Button";

import "./styles.scss";

export default function Wanted(props) {
  return (
      <section className="filter--wanted">
        <Button onClick={event => props.onSelect()} wanted>
          Wanted
        </Button>
      </section>
  );
}
