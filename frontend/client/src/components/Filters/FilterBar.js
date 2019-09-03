import React, {useState} from "react";

import Events from "./Events";
import Flagged from "./Flagged";
import Mine from "./Mine";
import Notices from "./Notices";
import Offers from "./Offers";
import Wanted from "./Wanted";

import "./styles.scss";

export default function FilterBar(props) {

  return (
    <section className="filter--bar container">
      {props.filter === "EVENTS" ? 
      <Events selected onSelect={props.onSelect}></Events>:
      <Events onSelect={props.onSelect}></Events>}
      {props.filter === "FLAGGED" ? 
      <Flagged selected onSelect={props.onSelect}></Flagged> :
      <Flagged onSelect={props.onSelect}></Flagged>}
      {props.filter === "MINE" ? 
      <Mine selected onSelect={props.onSelect}></Mine> :
      <Mine onSelect={props.onSelect}></Mine>}
      {props.filter === "NOTICES" ? 
      <Notices selected onSelect={props.onSelect}></Notices> :
      <Notices onSelect={props.onSelect}></Notices>}
      {props.filter === "OFFERS" ? 
      <Offers selected onSelect={props.onSelect}></Offers> :
      <Offers onSelect={props.onSelect}></Offers>}
      {props.filter === "WANTED" ? 
      <Wanted selected onSelect={props.onSelect}></Wanted> :
      <Wanted onSelect={props.onSelect}></Wanted>}
    </section>
  );
}