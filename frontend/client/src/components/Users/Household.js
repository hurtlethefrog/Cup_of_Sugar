import React, {state, useState} from "react";

export default function Household(props) {

  for (let obj in  props.household) {
      // console.log(props.household[obj].first_name)
      // console.log(props.household[obj].last_name)
      // console.log(props.household[obj].profile_pic)
  }

  if(props.state) {
    console.log("XXXXXXX",props.household)
  }
  return (
    <div>
      <ul>
        <li></li>
      </ul>
    
    </div>
  );
}
