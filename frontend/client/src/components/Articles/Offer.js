import React, { useState } from "react";
import { dateFormatter, timeAgo } from "../../helper";
import "./styles.scss";

export default function Offer(props) {
  const [state, setState] = useState(false);
  const [comment, setComment] = useState({
    // id: props.article.offer_request_id,
    type: "offer",
    offers_requests_id: props.article.offers_requests_id
  });

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
        <img src={comment.profile_pic ? comment.profile_pic : "/images/user-circle-regular.svg"} 
        alt="profile-pic"/>
        <div className="article--userinfo">
          {comment.first_name} {comment.last_name[0].toUpperCase() + "."}
        </div>
        <div className="comment--content">{comment.comment}</div>
        <div className="hideable--date">{timeAgo(comment.created_at)}</div>
      </div>
    );
  });

  return (
    <article className="box offer">
      <img className="article-icon" src="images/hand-point-right-regular.svg" alt="offer icon"/>
      <div className="article--userinfo">
        <img src={props.article.owner[0].profile_pic ? props.article.owner[0].profile_pic : "/images/user-circle-regular.svg"} 
          alt={"profile-pic"} />
        {props.article.owner[0].first_name}{" "}
        {props.article.owner[0].last_name[0].toUpperCase() + "."}
      </div>
      <div className="article--title">{props.article.title}</div>
      <div className="article--description">{props.article.description}</div>
      {props.article.image ? (
        <img
          className="item--image"
          src={props.article.image}
          alt="offer"
        />
      ) : (
        <div className="hidden">No image available</div>
      )}
      <div className="article--date">
        {dateFormatter(props.article.created_at)}
      </div>
      {props.article.comments.length > 0 && (
        <img
          className="expand-comments"
          onClick={event => setState(!state)}
          src={expandArrow()}
          alt="arrow"
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
