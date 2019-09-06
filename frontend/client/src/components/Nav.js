import React, { state, useState } from "react";
import './Nav.scss';
import Household from './Users/Household';

import { Link } from 'react-router-dom';

export default function Nav(props) {
  const [state, setState] = useState(false);
  
  return (
  <nav>
    <di>{console.log("NAV PROPS", props)}</di>
    <div className="brand">
      <img className="logo" src={props.logo}/>  
      <h1>Cup of Sugar</h1>
    </div>

    <ul>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/registration">Registration</Link> </li>
      <li>
        <img className="household" src="images/household.svg" onClick={event => setState(!state)} />
        <Household household={props.household} 
        setHousehold={props.setHousehold} 
        state={state}
        setState={setState}
        // account={props.account} 
        // setAccount={props.setAccount} 
        />
      </li>
      <li><img className="neighbours" src="images/neighbours.svg" /></li>
    </ul>
  </nav>
  );



}

// household={household} setHousehold={setHousehold} account={account} setAccount={setAccount}