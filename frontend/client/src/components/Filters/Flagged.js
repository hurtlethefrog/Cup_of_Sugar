import React from "react";

import Button from "../Button";

import "./styles.scss";

export default function Flagged(props) {
  return (
      <section className="filter--flagged">
        <Button onClick={event => props.onSelect("FLAGGED")} flagged>
          Flagged
        </Button>
      </section>
  );
}
