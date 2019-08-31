import React, {state, useState} from "react";
import Event from "./Event";
import Notice from "./Notice";
import Offer from "./Offer";
import Want from "./Want";


export default function Article(props) {
  const type = Object.keys(props.article)[0]
  // console.log("inside article comp. \n" + JSON.stringify(props.article))
  for(let key in props.article[type]) {
switch (type) {
  case "events":
    return (
      <section className="box">
        <Event 
          title={props.article[type][key].title}
          description={props.article[type][key].description}/>  
        </section>)
  case "notices":
    return (
      <section className="box">
        <Notice
          title={props.article[type][key].title} 
          description={props.article[type][key].description}/>
        </section>)
  }}
}