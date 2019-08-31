import React from "react";

import Button from "../Button";

import "./styles.scss";

export default function Notices(props) {
  return (
      <section className="filter--notice">
        <Button onClick={event => props.onSelect()} notice>
          Notices
        </Button>
      </section>
  );
}
