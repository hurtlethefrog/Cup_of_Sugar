import React, { useState, useEffect } from "react";
import axios from "axios";
require('dotenv').config();

let G_API_KEY = process.env.G_API_KEY;

let currentLocation = selected => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, selected);
  });
};

currentLocation()
  .then(position => {
    console.log("position.coords.latitude:", position.coords.latitude);
    console.log("position.coords.longitude:", position.coords.longitude);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${G_API_KEY}`
      )
      .then(res => {
        console.log("res", res);
      });
  })
  .catch(err => {
    console.log(err.message);
  });

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}

export default function Registration(props) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const passwordConfirmation = useFormInput("");
  const address = useFormInput("");
  const postalCode = useFormInput("");
  const city = useFormInput("");
  const province = useFormInput("");

  return (
    <main className="">
      <section className="">
        <form className="registration_fields">
          <input placeholder="First Name" {...firstName} required />
          <input placeholder="Last Name" {...lastName} required />
          <input placeholder="Email" {...email} required />
          <input
            placeholder="Password"
            {...password}
            required
            type="password"
          />
          <input
            placeholder="Confirm Password"
            {...passwordConfirmation}
            required
            type="password"
          />
          <input placeholder="Address" {...address} required />
          <input placeholder="Postal Code" {...postalCode} required />
          <input placeholder="City" {...city} required />
          <input placeholder="Province" {...province} required />
          <input type="submit" value="Submit" />
        </form>
        {/* <input value="" onChange="" /> */}
      </section>
    </main>
  );
}
