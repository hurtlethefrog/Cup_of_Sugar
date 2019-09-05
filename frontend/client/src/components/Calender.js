import React, { useState } from "react";
import ReactLightCalendar from "@lls/react-light-calendar";
import "@lls/react-light-calendar/dist/index.css";
import moment from "moment";
import convertTime from "../helpers/convertTime"

export default function Calendar(props) {
  const [state, setState] = useState({
    date: moment(),
    startDate: moment(),
    endDate: moment()
  });

  const onChange = (startDate, endDate) =>
    setState({...state, startDate, endDate});

  return (
    <div>
      <ReactLightCalendar
        startDate={state.startDate}
        endDate={state.endDate}
        onChange={onChange}
        range
        displayTime
      />
      <button
        onClick={event => {
          console.log(state);
          props.setDates(convertTime(state.startDate), convertTime(state.endDate));
        }}
      >
        Confirm Your Event
      </button>
    </div>
  );
}
