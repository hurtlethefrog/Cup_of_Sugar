import React, {state, useState} from "react";
import "../Nav.scss";

export default function Notifications(props) {
    if(props.state) {
        const notificationListItems = props.notifications.map(user => {
            return (
                <li>{user.first_name} {user.last_name}</li>
            );
        })
 
    return (
      <div className="household">
        <ul id="household-list">
          {notificationListItems}
        </ul> 
      </div>
    );
    } else return <div></div>
}
