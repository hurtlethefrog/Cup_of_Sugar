import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

const db = {
  community: {
    id: 1,
    name: "cool",
    location: "h3h"
  },
  household: [{
    id: 1,
    community_id: 1, 
    address: "1487 Norton crt",
    city: "Vancouver",
    province: "BC",
    postal_code: "h3h 1p1"
  },
  {
    id: 2,
    community_id: 1, 
    address: "1489 Norton crt",
    city: "Vancouver",
    province: "BC",
    postal_code: "h3h 1p2"
  }],
  user: [{
    id: 1,
    household_id: 2,
    first_name: "Duncan",
    last_name: "Haran",
    password: "Password",
    password_confirmation: "Password",
    profile_pic: "url to a pic",
    phone_number: "1234567890",
    bio: "short description of who I am",
    private: true
  },
  {
    id: 2,
    household_id: 1,
    first_name: "Nelly",
    last_name: "Main",
    password: "Password",
    password_confirmation: "Password",
    profile_pic: "url to a pic",
    phone_number: "1234567890",
    bio: "short description of who I am",
    private: true
  },
  {
    id: 3,
    household_id: 1,
    first_name: "Jess",
    last_name: "N-L",
    password: "Password",
    password_confirmation: "Password",
    profile_pic: "url to a pic",
    phone_number: "1234567890",
    bio: "short description of who I am",
    private: true
  },
]
}

function App() {
  const [state, setState] = useState(db)

  // useEffect(() => {
  //   axios.get("/test")
  //     .then(testData => {
  //       setState(testData.rows)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>Your community: {state.community.name}, found at: {state.community.location} </div>
        <div>Hello {state.user[0].first_name} </div>
      </header>
    </div>
  );
}

export default App;
