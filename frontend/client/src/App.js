import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import FilterBar from './components/Filters/FilterBar';

import Registration from './components/Steps/Registration';

// import filterSelector from './helpers/filter_selector';

const db = {
  community: {
    id: 1,
    name: "coolest beehive",
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
  const [filter, setFilter] = useState()


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
      <Registration></Registration>
      <header className="App-header">
        <div>Your community: {state.community.name}, found at: {state.community.location} </div>
        <button onClick={event => console.log(filter)}>Filter</button>
        <div>Hello {state.user[0].first_name} </div>
        {/* pass down the onSelect(setFilter) function which is handed to filters then button.js, and the current filter so FilterBar knows which filter to highlight */}
        <div>
        <FilterBar onSelect={setFilter} filter={filter}></FilterBar>
        </div>
      </header>
    </div>
  );
}

export default App;
