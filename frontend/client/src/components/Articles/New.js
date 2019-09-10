import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useVisualMode } from "../../hooks/useVisualMode";
import { validateNewEvent, validateNewArticle } from "../../helpers/validateNewArticle";
import Calendar from "../Calender";
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
  const [calender, setCalender] = useState(false);

  // resetting text after backing out of entries
  const defaultState = () => {
    return {
      title: null,
      description: null,
      start: null,
      end: null,
      location: null,
      image: null,
      type: null
    };
  };

  const sendArticle = () => {
    const isValid = validateNewArticle(text);
    if (isValid === true) {
      setText({ ...text, type: mode });
      props.onSubmit(text);
      setText(defaultState());
      setImagebox(false);
      setCalender(false);
      setError("");
      transition("new");
    }
    return setError(isValid);
  };
  const backButton = () => {
    setText(defaultState());
    setImagebox(false);
    setCalender(false);
    setError("");
    back();
  };

  // will be receiving start and end date from calender onChange
  const setDates = (a, b) => {
    setText({ ...text, start: a, end: b });
    setCalender(false);
  };

  useEffect(() => {
    setText({ ...text, type: mode });
  }, [mode]);

  const newArticleMode = mode => {
    switch (mode) {
      case "new":
        return (
          <img
            onClick={event => {
              transition("choose");
            }}
            className="add"
            src="images/add.png"
          />
        );
      case "choose":
        return (
          <div className="new--choose">
            <img
              src="images/backspace-solid.svg"
              className="add backspace"
              onClick={event => backButton()}
            ></img>
            <div className="field">
              <div className="control">
                <div className="select is-primary">
                  <select onChange={event => transition(event.target.value)}>
                    <option value="choose">
                      What would you like to create?
                    </option>
                    <option value="event">Event</option>
                    <option value="notice">Notice</option>
                    <option value="offer">Offer</option>
                    <option value="request">Request</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case "event":
        return (
          <div className="box event new">
            {" "}
            {error}
            {!calender && (
              <form onSubmit={event => event.preventDefault()}>
                <textarea
                  className="textarea is-warning"
                  rows="1"
                  name="title"
                  value={text.title}
                  placeholder="enter your event title"
                  onChange={event => {
                    setText({ ...text, title: event.target.value });
                    setError("");
                  }}
                ></textarea>
                <textarea
                  className="textarea is-warning"
                  rows="4"
                  name="description"
                  value={text.description}
                  placeholder="enter your event description"
                  onChange={event => {
                    setText({ ...text, description: event.target.value });
                    setError("");
                  }}
                ></textarea>
              </form>
            )}
            {imagebox && (
              <Dropzone
                onDrop={acceptedFiles =>
                  setText({ ...text, image: acceptedFiles })
                }
                accept="image/png, image/jpeg"
                key={mode + "_dropbox"}
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
                      {!isDragActive &&
                        "Click here or drop a png/jpeg to upload!"}
                      {isDragActive && !isDragReject && "Right there!"}
                      {isDragReject &&
                        "File type not accepted, please choose a png or jpeg!"}
                      <ul className="list-group mt-2">
                        {acceptedFiles.length > 0 &&
                          acceptedFiles.map(acceptedFile => (
                            <li key={acceptedFile.name + "key"} className="box">
                              {acceptedFile.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </section>
                )}
              </Dropzone>
            )}
            <div className="add button-bar">
              {calender === false && (
                <img
                  src="images/calendar-times-solid.svg"
                  className="add backspace"
                  onClick={event => setCalender(!calender)}
                ></img>
              )}
              {calender && <Calendar setDates={setDates}></Calendar>}
              {!calender && (
                <img
                  src="images/check-square-solid.svg"
                  className="add backspace"
                  onClick={event => sendArticle()}
                ></img>
              )}
              {!imagebox && (
                <img
                  src="images/images-regular.svg"
                  className="add backspace"
                  onClick={event => setImagebox(!imagebox)}
                ></img>
              )}
              {calender ? (
                <img
                  src="images/backspace-solid.svg"
                  className="add backspace"
                  onClick={event => setCalender(false)}
                ></img>
              ) : (
                <img
                  src="images/backspace-solid.svg"
                  className="add backspace"
                  onClick={event => backButton()}
                ></img>
              )}
            </div>
          </div>
        );
      case "notice":
        return (
          <div className="box notice new">
            {" "}
            {error}
            <form onSubmit={event => event.preventDefault()}>
              <textarea
                className="textarea is-warning"
                rows="1"
                name="title"
                placeholder="enter your notice title"
                onChange={event =>
                  setText({ ...text, title: event.target.value })
                }
              ></textarea>
              <textarea
                className="textarea is-warning"
                rows="4"
                name="description"
                placeholder="enter your event description"
                onChange={event =>
                  setText({ ...text, description: event.target.value })
                }
              ></textarea>

              {imagebox && (
                <Dropzone
                  onDrop={acceptedFiles =>
                    setText({ ...text, image: acceptedFiles })
                  }
                  accept="image/png, image/jpeg"
                  key={mode + "_dropbox"}
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
                        {!isDragActive &&
                          "Click here or drop a png/jpeg to upload!"}
                        {isDragActive && !isDragReject && "Right there!"}
                        {isDragReject &&
                          "File type not accepted, please choose a png or jpeg!"}
                        <ul className="list-group mt-2">
                          {acceptedFiles.length > 0 &&
                            acceptedFiles.map(acceptedFile => (
                              <li
                                key={acceptedFile.name + "key"}
                                className="box"
                              >
                                {acceptedFile.name}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </form>
            <div className="add button-bar">
              <img
                src="images/backspace-solid.svg"
                className="backspace"
                onClick={event => backButton()}
              ></img>
              <img
                src="images/check-square-solid.svg"
                className="check"
                onClick={event => {
                  sendArticle();
                  setText({ ...text, article_type: "offer" });
                }}
              ></img>
              {!imagebox && (
                <img
                  src="images/images-regular.svg"
                  className="add backspace"
                  onClick={event => setImagebox(!imagebox)}
                ></img>
              )}
            </div>
          </div>
        );
      case "request":
        return (
          <div className="box request new">
            {" "}
            {error}
            <form onSubmit={event => event.preventDefault()}>
              <textarea
                className="textarea is-warning"
                rows="1"
                name="title"
                placeholder="enter your request title"
                onChange={event =>
                  setText({ ...text, title: event.target.value })
                }
              ></textarea>

              <textarea
                className="textarea is-warning"
                rows="4"
                name="description"
                placeholder="enter your request description"
                onChange={event =>
                  setText({ ...text, description: event.target.value })
                }
              ></textarea>
            </form>
            <div className="add button-bar">
              <img
                src="images/backspace-solid.svg"
                className="backspace"
                onClick={event => backButton()}
              ></img>
              <img
                src="images/check-square-solid.svg"
                className="check"
                onClick={event => {
                  sendArticle();
                  setText({ ...text, article_type: "request" });
                }}
              ></img>
            </div>
          </div>
        );
      case "offer":
        return (
          <div className="box offer new">
            {" "}
            {error}
            <form onSubmit={event => event.preventDefault()}>
              <textarea
                className="textarea is-warning"
                rows="1"
                name="title"
                placeholder="enter your offer title"
                onChange={event =>
                  setText({ ...text, title: event.target.value })
                }
              ></textarea>
              <textarea
                className="textarea is-warning"
                rows="4"
                name="description"
                placeholder="enter your offer description"
                onChange={event =>
                  setText({ ...text, description: event.target.value })
                }
              ></textarea>
              {imagebox && (
                <Dropzone
                  onDrop={acceptedFiles =>
                    setText({ ...text, image: acceptedFiles })
                  }
                  accept="image/png, image/jpeg"
                  key={mode + "_dropbox"}
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
                        {!isDragActive &&
                          "Click here or drop a png/jpeg to upload!"}
                        {isDragActive && !isDragReject && "Right there!"}
                        {isDragReject &&
                          "File type not accepted, please choose a png or jpeg!"}
                        <ul className="list-group mt-2">
                          {acceptedFiles.length > 0 &&
                            acceptedFiles.map(acceptedFile => (
                              <li
                                key={acceptedFile.name + "key"}
                                className="box"
                              >
                                {acceptedFile.name}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </form>
            <div className="add button-bar">
              <img
                src="images/backspace-solid.svg"
                className="backspace"
                onClick={event => backButton()}
              ></img>
              <img
                src="images/check-square-solid.svg"
                className="check"
                onClick={event => {
                  sendArticle();
                }}
              ></img>
              {!imagebox && (
                <img
                  src="images/images-regular.svg"
                  className="image-add"
                  onClick={event => setImagebox(!imagebox)}
                ></img>
              )}
            </div>
          </div>
        );

      default:
        break;
    }
  };

  return <div className="new--article--box">{newArticleMode(mode)}</div>;
}
