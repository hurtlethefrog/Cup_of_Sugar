import React, { useState } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";
import validateNewArticle from '../../helpers/validateNewArticle';
import "./styles.scss";

export default function New(props) {
  const [text, setText] = useState({
    title: null,
    description: null,
    start: null,
    end: null,
    location: null,
    image: null
  });
  const {mode, transition, back } = useVisualMode("new")

  const newArticleMode = (mode) => {
    switch (mode) {
      case "new":
        return (
          <button
            onClick={event => {
              transition("choose");
            }}
          >
            Create
          </button>
        );
      case "choose":
        return (
          <div>
            <button
              onClick={event => {
                transition("event");
              }}
            >
              Event
            </button>
            <button
              onClick={event => {
                transition("notice");
              }}
            >
              Notice
            </button>
            <button
              onClick={event => {
                transition("request");
              }}
            >
              Request
            </button>
            <button
              onClick={event => {
                transition("offer");
              }}
            >
              Offer
            </button>
            <button
              onClick={event => {
                back();
              }}
            >
              Back
            </button>
          </div>
        );
      case "event":
        return (
          <button
            onClick={event => {
              back();
            }}
          >
            Back
          </button>
        );
      case "notice":
        return (
          <button
            onClick={event => {
              back();
            }}
          >
            Back
          </button>
        );
      case "request":
        return (
          <button
            onClick={event => {
              back();
            }}
          >
            Back
          </button>
        );
      case "offer":
        return (
          <div>
            <form>

              
            <button onClick={event => {
              if (validateNewArticle(text)) {
                props.onSubmit(text)
              } return validateNewArticle(text)
            }}>Confirm</button>
            </form>
          <button
            onClick={event => {
              back();
            }}
          >
            Back
          </button>
            
          </div>
        );

      default:
        break;
    }
  };

  return <div className="new--article--box box">
  <button onClick={event => console.log(mode)}>state?</button>
  {newArticleMode(mode)}</div>;
}
{
  /* <section className="new--button">
  <button onClick={event => {setState(!state)}}>
    New
  </button>
</section> : <section className="new--article">
  <textarea onChange={event => {setText(event.target.value)}} className="textarea" placeholder="description"></textarea>
  <button onClick={event => {setState(!state)}}>Cancel</button>
  <button onClick={event => {props.onSubmit(text)}}>Submit</button>
</section> */
}
