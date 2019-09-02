import React, { useState, useEffect } from 'react';
import './Homepage.scss';
import Axios from 'axios';
import FilterBar from './components/Filters/FilterBar';
import Article from './components/Articles/Article';
const uuidv4 = require('uuid/v4');
// import filterSelector from './helpers/filter_selector';


// const db = {
const dummyAcc = {
  community: {
    id: 1,
    name: "coolest beehive",
    location: "h3h"
  },
  household: [{
    id: 1,
    community_id: 1, 
    address: "1489 Norton crt",
    city: "Vancouver",
    province: "BC",
    postal_code: "h3h 1p2"
  }],
  user: [
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

const dummyArticles = [{
  events:[{
    id: 1,
    owner:{
      id: 3,
      first_name:"jess"
    },
    description: "this is probably a birthday party or somehting",
    location: "here's where we are",
    title: "my 35th",
    cancelled: false,
    archive: true,
    comments:[{
    id: 1,
    owner:{
      id:1,
      first_name: "duncan"
    },
    text: "I would love to go to your birthday",
    notice_id: null,
    offer_request_id: null, 
    event_id: 1
    }]
  },
  {
    id: 2,
    owner:{
      id: 1,
      first_name:"duncan"
    },
    description: "I'm hosting game night",
    location: "here's where we are",
    title: "games and beer",
    cancelled: false,
    archive: true,
    comments:[{
    id: 2,
    owner:{
      id: 2,
      first_name: "nelly"
    },
    text: "can I bring wine instead?",
    notice_id: null,
    offer_request_id: null, 
    event_id: 2
    }, 
    {
    id:3, 
    owner: {
      id: 3,
      first_name: "jess"
    },
    text: "don't think I can make it :(",
    notice_id: null,
    offer_request_id: null, 
    event_id: 2
    }]
  }]
},
{
    // ////
  notices:[{
    id: 1,
    owner:{
      id: 3,
      first_name:"jess"
    },
    description: "This is the body of the notice",
    title: "I lost my dog",
    cancelled: false,
    archive: true,
    comments:[{
    id: 1,
    owner:{
      id:1,
      first_name: "duncan"
    },
    text: "I saw him on 5th!",
    notice_id: null,
    offer_request_id: null, 
    event_id: 1
    }]
  },
  {
    id: 2,
    owner:{
      id: 1,
      first_name:"duncan"
    },
    description: "I'm hosting game night",
    location: "here's where we are",
    title: "games and beer",
    cancelled: false,
    archive: true,
    comments:[{
    id: 2,
    owner:{
      id: 2,
      first_name: "nelly"
    },
    text: "can I bring wine instead?",
    notice_id: null,
    offer_request_id: null, 
    event_id: 2
    }, 
    {
    id:3, 
    owner: {
      id: 3,
      first_name: "jess"
    },
    text: "don't think I can make it :(",
    notice_id: null,
    offer_request_id: null, 
    event_id: 2
    }]
  }]
}
]

export default function Homepage() {
  const [articles, setArticles] = useState(dummyArticles)
  const [filter, setFilter] = useState()
  const [account, setAccount] = useState(dummyAcc)

  // useEffect(() => {
  //   axios.get("/test")
  //     .then(testData => {
  //       setArticles(testData.rows)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // })


  return (
    <div className="Homepage">
      <header className="Homepage-header">
        <div>Hypothetical navbar for: {account.community.name}, found at: {account.community.location} </div>
        <button onClick={event => console.log(filter)}>Current Filter</button>
        <div>Hello {account.user[0].first_name} </div>
        {/* pass down the onSelect(setFilter) function which is handed to filters then button.js, and the current filter so FilterBar knows which filter to highlight */}
        <div>
          <FilterBar onSelect={setFilter} filter={filter}/>
        </div>
        {/* map must be handed an array from articles hook, once recieved in Article it will be identified and the apropriate article component will be rendered */}
        <div className="container--articles">{articles.map(article => {
          console.log(article)
          return (
            <Article
              key={uuidv4(6)}
              article={article}
            />
          );
        })}
        </div>
      </header>
    </div>
  );
}
