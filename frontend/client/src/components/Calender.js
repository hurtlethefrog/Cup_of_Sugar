import React, { useState } from "react";
import ReactLightCalendar from "@lls/react-light-calendar";
import "@lls/react-light-calendar/dist/index.css";
import moment from "moment";
import convertTime from "../helpers/convertTime";

export default function Calendar(props) {
  const [state, setState] = useState({
    date: moment(),
    startDate: moment(),
    endDate: moment()
  });

  const onChange = (startDate, endDate) =>
    setState({ ...state, startDate, endDate });

  return (
    <section>
      <div className="calendar">
        <ReactLightCalendar
          startDate={state.startDate}
          endDate={state.endDate}
          onChange={onChange}
          range
          displayTime
        />
        <img
          src="images/check-square-solid.svg"
          className="add backspace"
          onClick={event =>
            props.setDates(
              convertTime(state.startDate),
              convertTime(state.endDate)
            )
          }
        ></img>
      </div>
    </section>
  );
}
