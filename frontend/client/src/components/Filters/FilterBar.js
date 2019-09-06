import React, {useState} from "react";

import Events from "./Events";
import Flagged from "./Flagged";
import Mine from "./Mine";
import Notices from "./Notices";
import Offers from "./Offers";
import Wanted from "./Wanted";

import "./styles.scss";

export default function FilterBar(props) {

  const[categories, setCategory] = useState({
    articles: true, 
    events: false, 
    notices: false, 
    // flagged: false, 
    offers: false, 
    requests: false, 
    mine: false
  })

  const toggleFilter = category => {
    const newState = {}
    for (let key in categories) {
      if (key === category) {
        newState[key] = true;
      } else 
        newState[key] = false;
     } setCategory(newState)
  }

  return (
    <section className="filter--bar container">
      {props.filter === "events" ? 
      <Events selected onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Events> :
      <Events onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Events>}
      {/* stretch goal for flagged articles */}
      {/* {props.filter === "flagged" ? 
      <Flagged selected onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Flagged> :
      <Flagged onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Flagged>} */}
      {props.filter === "mine" ? 
      <Mine selected onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Mine> :
      <Mine onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Mine>}
      {props.filter === "notices" ? 
      <Notices selected onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Notices> :
      <Notices onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Notices>}
      {props.filter === "offers" ? 
      <Offers selected onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Offers> :
      <Offers onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Offers>}
      {props.filter === "requests" ? 
      <Wanted selected onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Wanted> :
      <Wanted onSelect={props.onSelect} toggleFilter={toggleFilter} categories={categories}></Wanted>}
    </section>
  );
}