import React, { useState, useEffect } from "react";
import axios from "axios";

import "./modal.scss";

export default function InvitesModal(props) {
    const [invitees, setInvitees] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
          .get(`/api/users?id=${props.account.user_id}`)
          .then(({data}) => {
              setUsers(data.filter((ele)=>{return ele.id != props.account.user_id}))
          })
          .catch(err => console.log(err));
    }, []);

    const renderDropdown = users.filter((ele)=> {return !invitees.includes(String(ele.id))}).map((user)=>{
        return (
            <option key={user.id} value={user.id}>{user.first_name + " " + user.last_name}</option>
        );
    })
    const renderInvitees = invitees.map((user)=>{
        return (
            <div key={user} className="list-row">
                <img onClick={() => setInvitees(invitees.filter((ele)=>{return ele != user}))} src="images/user-times-solid.svg">
                </img>
                <p>{users.map((ele)=> {if (ele.id == user) {return ele.first_name + " " + ele.last_name}})}</p>
            </div>
        )
    })
    return (
        <div className="modal">
            <h2>Invite some community members!</h2>
            <div className="content">
                <select onChange={(e)=>setInvitees([...invitees, e.target.value])}>
                    {renderDropdown}
                </select>
                <div className="list-container">
                    {renderInvitees}
                </div>
            </div>
            <div className="actions">
                <button onClick={e => {props.handleSubmit(invitees);props.toggleInvitesModal(false)}} className="toggle-button">OK</button>
                <button onClick={e => props.toggleInvitesModal(false)} className="toggle-button">Back</button>
            </div>
        </div>
    )
}