import React, { state, useState } from "react";
import './Nav.scss';
import Household from './Users/Household';

import { Link } from 'react-router-dom';

export default function Nav(props) {
  const [state, setState] = useState(false);
  
  return (
  <nav className="nav">
    <div className="brand">
      <img className="logo" src="images/CupOfSugar_Logo.svg"/>  
      <h1></h1>
    </div>

    <ul>
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
    </ul>
  </nav>
  );

}