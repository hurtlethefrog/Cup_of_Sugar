import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useVisualMode } from "../../hooks/useVisualMode";
import validateNewArticle from "../../helpers/validateNewArticle";
import "./styles.scss";

export default function New(props) {
  const { mode, transition, back } = useVisualMode("new");
  const [text, setText] = useState({
    title: null,
    description: null,
    start: null,
    end: null,
    location: null,
    image: null,
    type: null
  });
  const [error, setError] = useState();
  const [imagebox, setImagebox] = useState(false);

  useEffect(() => {
    setText({ ...text, type: mode });
  }, [mode]);

  const newArticleMode = mode => {
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
          <div className="field">
            <div className="control">
              <div className="select is-primary">
                <select onChange={event => transition(event.target.value)}>
                  <option value="choose">What would you like to create?</option>
                  <option value="event">Event</option>
                  <option value="notice">Notice</option>
                  <option value="request">Request</option>
                  <option value="offer">Offer</option>
                  <option value="new">Back</option>
                </select>
              </div>
            </div>
          </div>
        );
      case "event":
        return (
          <div>
            {" "}
            {error}
            <form onSubmit={event => event.preventDefault()}>
              <input name="title" placeholder="enter your event title"></input>
              <input name="description" placeholder="enter your event description"></input>
              {imagebox === false && <button onClick={event => setImagebox(!imagebox)}>Upload an image</button>}
              {imagebox && 
              <Dropzone
                onDrop={acceptedFiles =>
                  setText({ ...text, image: acceptedFiles })
                }
                accept="image/png, image/jpeg"
              >
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject,
                  acceptedFiles
                }) => (
                  <section className="box">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!isDragActive && "Click here or drop a file to upload!"}
                      {isDragActive && !isDragReject && "Right there!"}
                      {isDragReject &&
                        "File type not accepted, please choose a png or jpeg!"}
                      <ul className="list-group mt-2">
                        {acceptedFiles.length > 0 &&
                          acceptedFiles.map(acceptedFile => (
                            <li className="box">{acceptedFile.name}</li>
                          ))}
                      </ul>
                    </div>
                  </section>
                )}
              </Dropzone>
              }
              <button
                onClick={event => {
                  const isValid = validateNewArticle(text);
                  if (isValid === true) {
                    props.onSubmit(text);
                  }
                  return setError(isValid);
                }}
              >
                Confirm
              </button>
            </form>
            <button
              onClick={event => {
                setImagebox(false)
                setError("");
                back();
              }}
            >
              Back
            </button>
          </div>
        );
      case "notice":
        return (
          <div>
            {" "}
            {error}
            <form onSubmit={event => event.preventDefault()}>
              <input name="title"></input>
              <input name="description"></input>
              <button
                onClick={event => {
                  const isValid = validateNewArticle(text);
                  if (isValid === true) {
                    props.onSubmit(text);
                  }
                  return setError(isValid);
                }}
              >
                Confirm
              </button>
            </form>
            <button
              onClick={event => {
                setError("");
                back();
              }}
            >
              Back
            </button>
          </div>
        );
      case "request":
          return (
            <div>
              {" "}
              {error}
              <form onSubmit={event => event.preventDefault()}>
                <input name="title" placeholder="enter your request title"></input>
                <input name="description" placeholder="enter your request description"></input>
                <button
                  onClick={event => {
                    const isValid = validateNewArticle(text);
                    if (isValid === true) {
                      props.onSubmit(text);
                    }
                    return setError(isValid);
                  }}
                >
                  Confirm
                </button>
              </form>
              <button
                onClick={event => {
                  setError("");
                  back();
                }}
              >
                Back
              </button>
            </div>
          );
      case "offer":
          return (
            <div>
              {" "}
              {error}
              <form onSubmit={event => event.preventDefault()}>
                <input name="title" placeholder="enter your request title"></input>
                <input name="description" placeholder="enter your request description"></input>
                {!imagebox && <button onClick={event => setImagebox(!imagebox)}>Upload an image</button>}
              {imagebox && 
              <Dropzone
                onDrop={acceptedFiles =>
                  setText({ ...text, image: acceptedFiles })
                }
                accept="image/png, image/jpeg"
              >
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject,
                  acceptedFiles
                }) => (
                  <section className="box">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!isDragActive && "Click here or drop a file to upload!"}
                      {isDragActive && !isDragReject && "Right there!"}
                      {isDragReject &&
                        "File type not accepted, please choose a png or jpeg!"}
                      <ul className="list-group mt-2">
                        {acceptedFiles.length > 0 &&
                          acceptedFiles.map(acceptedFile => (
                            <li className="box">{acceptedFile.name}</li>
                          ))}
                      </ul>
                    </div>
                  </section>
                )}
              </Dropzone>
              }
                <button
                  onClick={event => {
                    const isValid = validateNewArticle(text);
                    if (isValid === true) {
                      props.onSubmit(text);
                    }
                    return setError(isValid);
                  }}
                >
                  Confirm
                </button>
              </form>
              <button
                onClick={event => {
                  setImagebox(false)
                  setError("");
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

  return (
    <div className="new--article--box box">
      <button
        onClick={event => console.log("---mode---", mode, "---text---", text, "---imagebox---", imagebox)}
      >
        state?
      </button>
      {newArticleMode(mode)}
    </div>
  );
}
