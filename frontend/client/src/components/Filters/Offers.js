import React from "react";

import Button from "../Button";

import "./styles.scss";

export default function Offers(props) {
  return (
      <section className="filter--offers">
        <Button onClick={event => props.onSelect()} offers>
          Offers
        </Button>
      </section>
  );
}
