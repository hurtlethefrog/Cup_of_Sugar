import React, { state, useState } from "react";
import { dateFormatter, timeAgo, eventDate } from "../../helper"

import "./styles.scss";

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
        <div className="hideable--date">{timeAgo(comment.created_at)}</div>
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
       <div className="article-icon">E</div>
      <div className="article--userinfo" >
      <img src={props.article.profile_pic}/>
        {props.article.first_name +" "+ props.article.last_name[0].toUpperCase() + "."}
      </div>
      <div className="article--title">{props.article.title}</div>
      <div className="article--description">{props.article.description}</div>
      <div className="event--dates">
        <p>Start: {eventDate(props.article.start)}</p>
        <p>End: {eventDate(props.article.end)}</p>
      </div>
      <div className="article--date">{dateFormatter(props.article.created_at)}</div>
      <div onClick={event => setState(!state)}>***</div>
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
