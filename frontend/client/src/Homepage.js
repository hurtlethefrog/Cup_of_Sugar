import React, { useState, useEffect } from "react";
import "./Homepage.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "./components/Filters/FilterBar";
import Articles from "./components/Articles/Articles";
import New from "./components/Articles/New";
import Nav from "./components/Nav";
import { defaultProps } from "@lls/react-light-calendar";
import decode from "jwt-decode";

// const dummyAcc = {
//   community: {
//     id: 1,
//     name: "coolest beehive",
//     location: "h3h"
//   },
//   household: [
//     {
//       id: 1,
//       community_id: 1,
//       address: "1489 Norton crt",
//       city: "Vancouver",
//       province: "BC",
//       postal_code: "h3h 1p2"
//     }
//   ],
//   user: [
//     {
//       id: 1,
//       household_id: 1,
//       first_name: "Nelly",
//       last_name: "Main",
//       password: "Password",
//       password_confirmation: "Password",
//       profile_pic: "url to a pic",
//       phone_number: "1234567890",
//       bio: "short description of who I am",
//       private: true
//     },
//     {
//       id: 3,
//       household_id: 1,
//       first_name: "Jess",
//       last_name: "N-L",
//       password: "Password",
//       password_confirmation: "Password",
//       profile_pic: "url to a pic",
//       phone_number: "1234567890",
//       bio: "short description of who I am",
//       private: true
//     }
//   ]
// };

export default function Homepage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.app.user);
  const jwt = localStorage.getItem("jwt")
  const decoded_jwt = decode(jwt)
  const jwt_user = decoded_jwt ? decoded_jwt : {user_id : -1}
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("articles");
  const safeUser = user ? user : jwt_user
  const [account, setUser] = useState(safeUser);
  const [newArticle, setNewArticle] = useState();
  const [household, setHousehold] = useState();
  // toggles to trigger articles refresh after sucessful post
  const [post, setPost] = useState(true);
  const [comment, makeComment] = useState();
  const [attendee, addAttendee] = useState(false);

  const updateComments = (arr, payload, cb, type) => {
    cb(prev => {
      for (let ele of prev) {
        if (ele[`${type}s_id`] === payload[`${type}s_id`]) {
          ele.comments.push(payload);
        }
      }
      return [...prev];
    });
  };

  const updateAttendees = (payload, cb) => {
    cb(prev => {
      for (let ele of prev) {
        if (ele[`events_id`] === payload[`events_id`]) {
          ele.attendees.push(payload);
        }
      }
      return [...prev];
    });
  };
  
  const tagGenerator = type => {
    if (type === "offer" || type === "request") {
      return "offers_requests_id";
    } else {
      return `${type}s_id`;
    }
  };
  
  useEffect(() => {
    axios
      .get(`/api/households/${account.user_id}`)
      .then(household => {
        // console.log("HOUSEHOLDDATA", household.data);
        setHousehold(household.data);
      })
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`/api/users/${account.user_id}`)
  //     .then(account => {
  //       console.log("ACCOUNTDATA", account);
  //       setUser(account.data);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  useEffect(() => {
    if (filter === "mine") {
      axios
        .get(`/api/users/${account.user_id}/articles`)
        .then(articles => {
          setArticles(articles.data);
        })
        .catch(err => console.log(err));
    } else {
      axios
        .get(`/api/${filter}`)
        .then(articles => {
          setArticles(articles.data);
        })
        .catch(err => console.log(err));
    }
  }, [filter, post]);

  // switch case that posts to relevant route after removing unneeded keys
  useEffect(() => {
    if (newArticle) {
      switch (newArticle.type) {
        case "event":
          const eventArticle = {
            ...newArticle,
            article_type: newArticle.type,
            owner_id: account.user_id
          };
          delete eventArticle.type;
          // console.log(eventArticle);
          axios
            .post(`/api/${newArticle.type}s`, {
              ...eventArticle
            })
            .then(res => {
              setPost(!post);
            })
            .catch(err => console.log(err));
          break;
        case "notice":
          const noticeArticle = {
            ...newArticle,
            article_type: newArticle.type,
            owner_id: account.user_id
          };
          delete noticeArticle.type;
          delete noticeArticle.start;
          delete noticeArticle.end;
          delete noticeArticle.location;

          axios
            .post(`/api/${newArticle.type}s`, {
              ...noticeArticle
            })
            .then(res => {
              setPost(!post);
            })
            .catch(err => console.log(err));
          break;
        case "offer":
          const offerArticle = {
            ...newArticle,
            article_type: newArticle.type,
            owner_id: account.user_id
          };
          delete offerArticle.type;
          delete offerArticle.start;
          delete offerArticle.end;
          delete offerArticle.location;

          axios
            .post(`/api/${newArticle.type}s`, {
              ...offerArticle
            })
            .then(res => {
              setPost(!post);
            })
            .catch(err => console.log(err));
          break;
        case "request":
          const requestArticle = {
            ...newArticle,
            article_type: newArticle.type,
            owner_id: account.user_id
          };
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

  const appendComment = comment => {
    const userComment = {
      ...comment,
      users_id: account.user_id
      // [tagGenerator(comment.type)]: comment.id
    };
    axios
      .post(`api/${userComment.type}s/${userComment.id}/comments`, {
        ...userComment
      })
      .then(res => {
        updateComments(articles, res.data, setArticles, userComment.type);
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    if (attendee.going === true) {
      axios
        .post(`api/events/${attendee.events_id}/attendees`, {
          users_id: account.user_id,
          events_id: attendee.events_id
        })
        .then(res => {
          console.log("attendee res:  ",res.data, attendee);
          updateAttendees(res.data, setArticles)
        })
        .catch(err => console.log(err));
    }
  }, [attendee]);

  return (
    <div className="App">
      <Nav
        household={household}
        setHousehold={setHousehold}
        account={account}
        setAccount={setUser}
      >
        NAVBAR
      </Nav>
      {/* pass down the onSelect(setFilter) function which is handed to filters then button.js, and the current filter so FilterBar knows which filter to highlight */}
      <div>
        <FilterBar onSelect={setFilter} filter={filter} />
      </div>

      {/* map must be handed an array from articles hook, once recieved in Article it will be identified and the apropriate article component will be rendered */}
      <div className="article-container">
        <div>
          {/* onSubmit function will need to ensure title description, everything else is optional */}
          <New onSubmit={setNewArticle} />
        </div>
        {(articles && account.user_id !== -1) ?  (
        <Articles
          makeComment={appendComment}
          articles={articles}
          addAttendee={addAttendee}
          // current user will need ot be set with user from useSelector
          currentUser={account.user_id}
        />
         ) :
         (
          <h1>Not logged in</h1>
           )} 
      </div>
    </div>
  );
}
