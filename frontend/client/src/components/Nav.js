import React, { state, useState } from "react";
import { Link } from 'react-router-dom';
import './Nav.scss';
import Household from './Users/Household';

const handleSubmission = () => {
  localStorage.removeItem('jwt');
}

export default function Nav(props) {
  const [state, setState] = useState(false);
  
  return (
  <nav className="nav">
    <div className="brand">
      <img className="logo" src="images/CupOfSugar_Logo_V2.svg"/>  
    </div>

    <div>
    <Link to="/" onClick={handleSubmission}>Logout</Link> 
    </div>

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