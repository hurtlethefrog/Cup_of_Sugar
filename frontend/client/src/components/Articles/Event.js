import axios from "axios";
import React, { useState } from "react";
import { dateFormatter, timeAgo, eventDate } from "../../helper";
import InvitesModal from "./InvitesModal";
import "./styles.scss";

export default function Event(props) {
  // if this state is true comments will be shown
  const [state, setState] = useState(false);
  const [modal, toggleModal] = useState(false);
  // if this state is true all attendee info will be shown
  const [attendees, setAttendees] = useState(false);
  const [comment, setComment] = useState({
    id: props.article.events_id,
    type: "event",
    events_id: props.article.events_id,
    open: false
  });
  console.log(props.article.id)
  const createInvitesAxios = (invitees)=>{
    axios
      .post(`/api/invites`, {invitees:invitees.toLocaleString(), event_id:props.article.id})
      .then(({data}) => {
        toggleModal(false)
      })
      .catch(err => console.log(err));
  }
  const checkAttendees = () => {
    for (let attendee of props.article.attendees) {
      if (attendee.id === props.currentUser) {
        return false;
      }
    }
    return true;
  };

  const expandArrow = () => {
    switch (state) {
      case false:
        return "images/arrow-circle-down-solid.svg";
      case true:
        return "images/arrow-circle-up-solid.svg";
      default:
        return "";
    }
  };

  const parsedComments = props.article.comments.map(comment => {
    return (
      <div className="comment--box box">
         <img src={comment.profile_pic ? comment.profile_pic : "/images/user-circle-regular.svg"} alt="profile"/>
        <div className="article--userinfo">
          {comment.first_name}
          {comment.last_name ? comment.last_name[0].toUpperCase() + "." : ""}
        </div>
        <div className="comment--content">
          <p>{comment.comment}</p>
        </div>
        <div className="hideable--date">{timeAgo(comment.created_at)}</div>
      </div>
    );
  });

  const allAttendees = props.article.attendees.map(attendee => {
    return (
      <div onClick={event => setAttendees(!attendees)}>
        <div className="comment--box box">
          <img src={attendee.profile_pic ? attendee.profile_pic : "/images/user-circle-regular.svg"} 
            alt="profile"
          />
          <div className="article--userinfo">
            {attendee.first_name ? attendee.first_name : ""}
          </div>
        </div>
      </div>
    );
  });

  return (
    <article className="box event">
      <img className="article-icon" src="images/calendar-alt-regular.svg" alt="calendar"/>
      <div className="article--userinfo">
        <img src={props.article.owner[0].profile_pic ? props.article.owner[0].profile_pic : "/images/user-circle-regular.svg"} 
          alt="profile" />
        {props.article.owner[0].first_name +
          " " +
          props.article.owner[0].last_name[0].toUpperCase() +
          "."}
      </div>
      <div className="article--title">{props.article.title}</div>
      <div className="article--description">{props.article.description}</div>
      <div className="dates">
        <div className="event--dates">
          <p>
            {eventDate(props.article.start)} - {eventDate(props.article.end)}
          </p>
        </div>
        <div className="article--date">
          {dateFormatter(props.article.created_at)}
        </div>
      </div>

      {props.article.attendees.length > 0 ? (
        <div
          className="attendees--summary"
          onClick={event => {if(props.article.owner[0].id != props.currentUser){setAttendees(!attendees)} else {toggleModal(true)}}}
        >
          {!attendees ? (
            <div>
              <div className="icon-box">
                <div className="attendees--icon">
                  <img src={props.article.attendees[0].profile_pic ? props.article.attendees[0].profile_pic : "/images/user-circle-regular.svg"} alt="profile" />
                </div>

                {props.article.attendees[1] && (
                  <div className="attendees--icon">
                    <img src={props.article.attendees[1].profile_pic ? props.article.attendees[1].profile_pic : "/images/user-circle-regular.svg"} alt="profile"/>
                  </div>
                )}
                {props.article.attendees[2] && (
                  <div className="attendees--icon">
                    <img src={props.article.attendees[2].profile_pic ? props.article.attendees[2].profile_pic : "/images/user-circle-regular.svg"} alt="profile" />
                  </div>
                )}
              </div>
              {checkAttendees() && <img
                className="add--attendee"
                src="images/user-plus-solid.svg"
                alt="user-icon"
                onClick={event =>
                  props.addAttendee({
                    going: true,
                    events_id: props.article.events_id
                  })
                }
              ></img>}
            </div>
          ) : (
            <div>
              {allAttendees}
              {checkAttendees() && <img
                className="add--attendee"
                src="images/user-plus-solid.svg"
                alt="user-plus-icon"
                onClick={event =>
                  props.addAttendee({
                    going: true,
                    events_id: props.article.events_id
                  })
                }
              ></img>}
            </div>
          )}
        </div>
      ) : (
       null
      )}
      {props.article.comments.length > 0 && (
          <img
            className="expand-comments"
            onClick={event => setState(!state)}
            src={expandArrow()}
            alt="arrow"
          ></img>
      )}
      {props.article.attendees.length === 0 && (
        <img
          className="add--attendee"
          src="images/user-plus-solid.svg"
          alt="add-attendee-icon"
          onClick={event =>
            props.addAttendee({
              going: true,
              events_id: props.article.events_id
            })
          }
        ></img>
      )}
      {props.article.comments.length <= 0 && (
        <form
          onSubmit={event => {
            event.preventDefault();
            props.makeComment(comment);
            setComment({ ...comment, comment: "" });
          }}
        >
          <input
            className="comment--input"
            type="text"
            value={comment.comment}
            placeholder="Add a comment"
            onChange={event =>
              setComment({ ...comment, comment: event.target.value })
            }
          ></input>
        </form>
      )}
      {state && <div className="comments--box">{parsedComments.reverse()}</div>}
      {state && (
        <form
          onSubmit={event => {
            event.preventDefault();
            props.makeComment(comment);
            setComment({ ...comment, comment: "" });
          }}
        >
          <input
            className="comment--input"
            type="text"
            value={comment.comment}
            placeholder="Add a comment"
            onChange={event =>
              setComment({ ...comment, comment: event.target.value })
            }
          ></input>
        </form>
      )}
      {modal && <InvitesModal toggleInvitesModal={()=>toggleModal(!modal)} handleSubmit={(invitees)=>createInvitesAxios(invitees)} account={props.currentUser}/>}
    </article>
  );
}
