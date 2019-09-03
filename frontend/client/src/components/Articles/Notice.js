import React, {useState} from "react";
import { dateFormatter, timeAgo } from "../../helper"
import "./styles.scss";

export default function Notice(props) {
  const [state, setState] = useState(false)

  const parsedComments = props.article.comments.map(comment => {
    return(
      <div className="comment--box box">
        <img src={comment.profile_pic}/>
    <div className="article--userinfo">{comment.first_name} {comment.last_name[0].toUpperCase()+ "." }</div>
    <div className="comment--content">{comment.comment}</div>
    <div className="hideable--date">{timeAgo(comment.created_at)}</div>
    </div>
    )
  })

  return (
    <article className="box" onClick={event => setState(!state)}>
      <div className="article-icon">N</div>
      <div className="article--userinfo" >
      <img src={props.article.profile_pic}/>
        {props.article.first_name +" "+ props.article.last_name[0].toUpperCase() + "."}
      </div>
      <div className="article--title">{props.article.title}</div>
      <div className="article--description">{props.article.description}</div>
      <div className="article--date">{dateFormatter(props.article.created_at)}</div>
      {state && parsedComments}
    </article>
  );
}