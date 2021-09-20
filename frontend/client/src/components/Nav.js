import axios from "axios";
import React, { state, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Nav.scss';
import Notifications from "./Users/Notifications";
// import Household from './Users/Household';

const handleSubmission = () => {
  localStorage.removeItem('jwt');
}

export default function Nav(props) {
  const [dropdown, toggleDropdown] = useState(false);
  const [invites, setInvites] = useState([]);
  useEffect(()=>{
    axios
      .get(`/api/invites/${props.account.user_id}`)
      .then((res) => {
        setInvites([res.data])
        console.log(invites)
      })
      .catch(err => console.log(err));
  }, [])
  return (
  <nav className="nav">
    <div className="brand">
      <img className="logo" src="images/CupOfSugar_Logo_V2.svg"/>  
    </div>
    <div>
      <a onClick={e=>toggleDropdown(!dropdown)}>Notifications</a>
      <Link to="/" onClick={handleSubmission}>Logout</Link> 
    </div>
    <Notifications notifications={invites}/>
    {/* <ul>
      <li>

      </li>
      <li>
        <img className="household" src="images/household.svg" onClick={event => setState(!state)} />
        <Household household={props.household} 
        setHousehold={props.setHousehold}
        state={state}
        setState={setState}
        account={props.account} 
        setAccount={props.setAccount} 
        />
      </li>
      <li><img className="neighbours" src="images/neighbours.svg" /></li>
    </ul> */}
  </nav>
  );

}