import React, { state, useState } from "react";

import "./styles.css";

export default function Event(props) {
  const [state, setState] = useState(false);
  const [attendees, setAttendees] = useState(false);

  const parsedComments = props.article.comments.map(comment => {
    return (
      <div className="comment--box box">
        <img src={comment.profile_pic} />
        <div className="article--userinfo">
          {comment.first_name} {comment.last_name[0].toUpperCase() + "."}
        </div>
        <div className="comment--content">{comment.comment}</div>
        <div className="hideable--date">{comment.created_at}</div>
      </div>
    );
  });

  const allAttendees = props.article.attendees.map(attendee => {
    return (
      <div onClick={event => setAttendees(!attendees)}>
        <div className="comment--box box">
        <img src={attendee.profile_pic} />
        <div className="article--userinfo">
          {attendee.first_name} {attendee.last_name[0].toUpperCase() + "."}
        </div>
      </div>
      </div>
    )
  });

  return (
    <article className="box">
      <img src={props.article.profile_pic} onClick={event => setState(!state)}/>
      <div className="article--userinfo" >
        {props.article.first_name +" "+ props.article.last_name[0].toUpperCase() + "."}
      </div>
      <div className="article--title">{props.article.title}</div>
      <div className="article--description">{props.article.description}</div>
      <div className="event--dates">
        {props.article.start + "--  --" + props.article.end}
      </div>
      <div className="hideable--date">{props.article.created_at}</div>
      {state && parsedComments}
      {/* {attendees ? (
        allAttendees
      ) : (
        <div
          className="attendees--summary"
          onClick={event => setAttendees(!attendees)}
        >
          {props.article.attendees[0].profile_pic + props.article.attendees[1].profile_pic + props.article.attendees[2].profile_pic} here's the attendee pics
        </div> */}
      {/* )} */}
    </article>
  );
}
