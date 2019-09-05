import React, { useState, useEffect } from "react";
import "./Homepage.scss";
import axios from "axios";
import FilterBar from "./components/Filters/FilterBar";
import Articles from "./components/Articles/Articles";
import New from "./components/Articles/New";
import Nav from "./components/Nav";

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
  const [filter, setFilter] = useState('articles');
  const [account, setUser] = useState(dummyAcc);
  const [newArticle, setNewArticle] = useState();
  // toggles to trigger articles refresh after sucessful post
  const [post, setPost] = useState(true);

  useEffect(() => {
    console.log(`/api/${filter}`);
    axios
      .get(`/api/${filter}`)
      .then(articles => {
        setArticles(articles.data);
      })
      .catch(err => console.log(err));
  }, [filter, post]);

  // switch case that posts to relevant route after removing unneeded keys
  useEffect(() => {
    if (newArticle) {
      switch (newArticle.type) {
        case "event":
          const eventArticle = { ...newArticle, article_type:newArticle.type };
          delete eventArticle.type;
          console.log(eventArticle);
          axios
            .post(`/api/${newArticle.type}s`, {
              ...eventArticle
            })
            .then(res => {
              console.log(res.data);
              setPost(!post);
            })
            .catch(err => console.log(err));
          break;
        case "notice":
          const noticeArticle = { ...newArticle, article_type:newArticle.type };
          delete noticeArticle.type;
          delete noticeArticle.start;
          delete noticeArticle.end;
          delete noticeArticle.location;

          console.log(noticeArticle);
          axios
            .post(`/api/${newArticle.type}s`, {
              ...noticeArticle
            })
            .then(res => {
              console.log(res.data);
              setPost(!post);
            })
            .catch(err => console.log(err));
          break;
        case "offer":
          const offerArticle = { ...newArticle, article_type:newArticle.type };
          delete offerArticle.type;
          delete offerArticle.start;
          delete offerArticle.end;
          delete offerArticle.location;

          console.log(offerArticle);
          axios
            .post(`/api/${newArticle.type}s`, {
              ...offerArticle
            })
            .then(res => {
              console.log(res.data);
              setPost(!post);
            })
            .catch(err => console.log(err));
          break;
        case "request":
          const requestArticle = { ...newArticle, article_type:newArticle.type };
          delete requestArticle.type;
          delete requestArticle.start;
          delete requestArticle.end;
          delete requestArticle.image;
          delete requestArticle.location;

          console.log(requestArticle);
          axios
            .post(`/api/${newArticle.type}s`, {
              ...requestArticle
            })
            .then(res => {
              console.log(res.data);
              setPost(!post);
            })
            .catch(err => console.log(err));
          break;
      }
    }
  }, [newArticle]);

  return (
    <div className="App">
      <Nav>NAVBAR</Nav>

      <button onClick={event => console.log(filter)}>Current Filter</button>
      <button onClick={event => console.log(articles)}>Current Articles</button>
      <div>Hello {account.user[0].first_name} </div>
      {/* pass down the onSelect(setFilter) function which is handed to filters then button.js, and the current filter so FilterBar knows which filter to highlight */}
      <div>
        <FilterBar
          onSelect={setFilter}
          filter={filter}
        />
      </div>
      
      {/* map must be handed an array from articles hook, once recieved in Article it will be identified and the apropriate article component will be rendered */}
      <div className="article-container">
      <div>
      {/* onSubmit function will need to ensure title description, everything else is optional */}
        <New onSubmit={setNewArticle} />
      </div>
        {articles && <Articles articles={articles} />}
      </div>
    </div>
  );
}
