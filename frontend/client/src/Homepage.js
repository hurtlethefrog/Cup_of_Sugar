import React, { useState, useEffect } from 'react';
import './Homepage.scss';
import axios from 'axios';
import FilterBar from './components/Filters/FilterBar';
import Article from './components/Articles/Article';
// const uuidv4 = require('uuid/v4');
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
  const [articles, setArticles] = useState([])
  const [filter, setFilter] = useState()
  const [account, setAccount] = useState(dummyAcc)

  useEffect(() => {
    Promise.all([
      axios.get("/api/notices"),
      // axios.get("/api/events"),
      // axios.get("/api/wanted"),
      // axios.get("/api/offers")
    ])
      .then(allArticles => {
        const [notices] = allArticles
        setArticles(notices.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <div className="App">
        <button onClick={event => console.log(filter)}>Current Filter</button>
        <button onClick={event => console.log(articles)}>Current Articles</button>
        <div>Hello {account.user[0].first_name} </div>
        {/* pass down the onSelect(setFilter) function which is handed to filters then button.js, and the current filter so FilterBar knows which filter to highlight */}
        <div>
          <FilterBar onSelect={setFilter} filter={filter} />
        </div>
        {/* map must be handed an array from articles hook, once recieved in Article it will be identified and the apropriate article component will be rendered */}
        <div className="article-container">
          {articles && <Article articles={articles} />}
        </div>
      </div>
  );
}
