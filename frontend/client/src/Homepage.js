import React, { useState, useEffect } from 'react';
import './Homepage.scss';
import axios from 'axios';
import FilterBar from './components/Filters/FilterBar';
import Articles from './components/Articles/Articles';
import New from './components/Articles/New';
import Nav from './components/Nav';

const dummyAcc = {
  community: {
    id: 1,
    name: "coolest beehive",
    location: "h3h"
  },
  household: [
    {
      id: 1,
      community_id: 1,
      address: "1489 Norton crt",
      city: "Vancouver",
      province: "BC",
      postal_code: "h3h 1p2"
    }
  ],
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
    }
  ]
};

export default function Homepage() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("articles");
  const [account, setAccount] = useState(dummyAcc);
  const [newArticle, setNewArticle] = useState();

  useEffect(() => {
    axios.get(`/api/${filter}`)
    .then((articles) => {
      setArticles(articles.data)
    })
    .catch((err) => console.log(err))
  }, [filter])

  return (
    <div className="App">
        <Nav>NAVBAR</Nav>

        <button onClick={event => console.log(filter)}>Current Filter</button>
        <button onClick={event => console.log(articles)}>Current Articles</button>
        <div>Hello {account.user[0].first_name} </div>
        {/* pass down the onSelect(setFilter) function which is handed to filters then button.js, and the current filter so FilterBar knows which filter to highlight */}
        <div>
          <FilterBar onSelect={(a)=>{setFilter(a)}} filter={filter} />
        </div>
        {/* onSubmit function will need to ensure title description, everything else is optional */}
        <div>
          <New onSubmit={setNewArticle}/>
        </div>
        {/* map must be handed an array from articles hook, once recieved in Article it will be identified and the apropriate article component will be rendered */}
        <div className="article-container">
          {articles && <Articles articles={articles} />}
        </div>
      </div>
  );
}
