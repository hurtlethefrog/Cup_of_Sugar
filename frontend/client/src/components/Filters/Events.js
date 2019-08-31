import React from "react";

import Button from "../Button";

import "./styles.scss";

export default function Events(props) {
  return (
      <section className="filter--events">
        <Button onClick={event => {props.onSelect("EVENTS")}} events>
          Events
        </Button>
      </section>
  );
}