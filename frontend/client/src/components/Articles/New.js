import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useVisualMode } from "../../hooks/useVisualMode";
import validateNewArticle from "../../helpers/validateNewArticle";
import Calendar from "../Calender";
import "./styles.scss";
// import "../../../public/images"

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
            <img src="images/backspace-solid.svg" className="add backspace" onClick={event => backButton()}></img>
            <div className="field">
              <div className="control">
                <div className="select is-primary">
                  <select onChange={event => transition(event.target.value)}>
                    <option value="choose">
                      What would you like to create?
                    </option>
                    <option value="event">Event</option>
                    <option value="notice">Notice</option>
                    <option value="request">Request</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
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
              <input
                name="title"
                placeholder="enter your event title"
                onChange={event =>
                  setText({ ...text, title: event.target.value })
                }
              ></input>
              <input
                name="description"
                placeholder="enter your event description"
                onChange={event =>
                  setText({ ...text, description: event.target.value })
                }
              ></input>
              {imagebox === false && (
                <button onClick={event => setImagebox(!imagebox)}>
                  Upload an image
                </button>
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
              {calender === false && (
                <button onClick={event => setCalender(!calender)}>
                  Set Your Date
                </button>
              )}
              {calender && <Calendar setDates={setDates}></Calendar>}
              <button onClick={event => sendArticle()}>Confirm</button>
            </form>
            <button
              onClick={event => {
                backButton();
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
              <input
                name="title"
                placeholder="enter your nottice title"
                onChange={event =>
                  setText({ ...text, title: event.target.value })
                }
              ></input>
              <input
                name="description"
                placeholder="enter your event description"
                onChange={event =>
                  setText({ ...text, description: event.target.value })
                }
              ></input>
              {!imagebox && (
                <button onClick={event => setImagebox(!imagebox)}>
                  Upload an image
                </button>
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
              <button onClick={event => sendArticle()}>Confirm</button>
            </form>
            <button
              onClick={event => {
                backButton();
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
              <input
                name="title"
                placeholder="enter your request title"
                onChange={event =>
                  setText({ ...text, title: event.target.value })
                }
              ></input>
              <input
                name="description"
                placeholder="enter your request description"
                onChange={event =>
                  setText({ ...text, description: event.target.value })
                }
              ></input>
              <button onClick={event => sendArticle()}>Confirm</button>
            </form>
            <button
              onClick={event => {
                backButton();
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
              <input
                name="title"
                placeholder="enter your request title"
              ></input>
              <input
                name="description"
                placeholder="enter your request description"
              ></input>
              {!imagebox && (
                <button onClick={event => setImagebox(!imagebox)}>
                  Upload an image
                </button>
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
              <button onClick={event => sendArticle()}>Confirm</button>
            </form>
            <button
              onClick={event => {
                backButton();
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

  return <div className="box new--article--box">{newArticleMode(mode)}</div>;
}
