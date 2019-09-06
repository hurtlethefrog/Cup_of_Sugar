import React, {state, useState} from "react";

export default function Household(props) {
  if(props.state) {
  const householdMembers = props.household.map(user => {
    return (
      <li>{user.first_name} {user.last_name}</li>
    );
  })
 
    return (
      <div className="household">
        <ul>
          {householdMembers}
        </ul> 
      </div>
    );
} else {
    return (
      <div>
        <ul>
          <li>{}</li>
        </ul>
      </div>
    )

}
}
