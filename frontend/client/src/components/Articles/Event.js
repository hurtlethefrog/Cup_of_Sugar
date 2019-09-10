import React, { useState } from "react";
import { dateFormatter, timeAgo, eventDate } from "../../helper";
import "./styles.scss";

export default function Event(props) {
  // if this state is true comments will be shown
  const [state, setState] = useState(false);
  // if this state is true all attendee info will be shown
  const [attendees, setAttendees] = useState(false);
  const [comment, setComment] = useState({
    id: props.article.events_id,
    type: "event",
    events_id: props.article.events_id,
    open: false
  });
  const checkAttendees = () => {
    console.log("ATTENDEEE", props.article.attendees, props.currentUser)
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
    }
  };

  const parsedComments = props.article.comments.map(comment => {
    return (
      <div className="comment--box box">
         <img src={comment.profile_pic ? comment.profile_pic : "/images/user-circle-regular.svg"} alt={"profile-pic"}
          alt={"profile-pic"}/>
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
            alt={"profile-pic"}
          />
          <div className="article--userinfo">
            {attendee.first_name}{" "}
            {attendee.last_name
              ? attendee.last_name[0].toUpperCase() + "."
              : ""}
          </div>
        </div>
      </div>
    );
  });

  return (
    <article className="box event">
      <img className="article-icon" src="images/calendar-alt-regular.svg" />
      <div className="article--userinfo">
        <img src={props.article.owner[0].profile_pic ? props.article.owner[0].profile_pic : "/images/user-circle-regular.svg"} 
          alt={"profile-pic"} />
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
          onClick={event => setAttendees(!attendees)}
        >
          {!attendees ? (
            <div>
              <div className="icon-box">
                <div className="attendees--icon">
                  <img src={props.article.attendees[0].profile_pic ? props.article.attendees[0].profile_pic : "/images/user-circle-regular.svg"} alt={"profile-pic"} />
                </div>

                {props.article.attendees[1] && (
                  <div className="attendees--icon">
                    <img src={props.article.attendees[1].profile_pic ? props.article.attendees[1].profile_pic : "/images/user-circle-regular.svg"} alt={"profile-pic"} />
                  </div>
                )}
                {props.article.attendees[2] && (
                  <div className="attendees--icon">
                    <img src={props.article.attendees[2].profile_pic ? props.article.attendees[2].profile_pic : "/images/user-circle-regular.svg"} alt={"profile-pic"} />
                  </div>
                )}
              </div>
              {checkAttendees() && <img
                className="add--attendee"
                src="images/user-plus-solid.svg"
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
        <div>No one is attending yet, be the first.</div>
      )}
      {props.article.comments.length > 0 && (
        <div>
          <img
            className="expand-comments"
            onClick={event => setState(!state)}
            src={expandArrow()}
          ></img>
        </div>
      )}
      {props.article.attendees.length === 0 && (
        <img
          className="add--attendee"
          src="images/user-plus-solid.svg"
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
    </article>
  );
}
