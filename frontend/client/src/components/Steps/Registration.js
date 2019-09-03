import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Button from "../Button";
require("dotenv").config();
let REACT_APP_G_API_KEY = process.env.REACT_APP_G_API_KEY;

// Verifies the geolocation (user's current location)
let currentLocation = selected => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, selected);
  });
};

// Provide address (reverse geocoding) based on geolocation (user's current coordinates)
currentLocation()
  .then(position => {
    console.log("position.coords.latitude:", position.coords.latitude);
    console.log("position.coords.longitude:", position.coords.longitude);
    axios
      .get(
        // Only for temporary use
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=KEY`

        // Enable the following and comment out the one above if you want to make request from Google API (results are displayed in the console):
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${REACT_APP_G_API_KEY}`
      )
      .then(res => {
        console.log("res:", res);

        // // This formatted address isn't always ideal data. Perhaps it's better to concatenate pieces of data below (Street Number, Address, etc.)
        // console.log("Formatted Address:", res.data.results[0].formatted_address);

        // // Coordinates
        // console.log("Latitude:", res.data.results[0].geometry.location.lat);
        // console.log("Longitude:", res.data.results[0].geometry.location.lng);

        // // Pieces of data for various fields
        // console.log("Street Number:", res.data.results[0].address_components[0].long_name);
        // console.log("Address:",res.data.results[0].address_components[1].long_name);
        // console.log("City:", res.data.results[0].address_components[2].long_name);
        // console.log("Province/State:", res.data.results[0].address_components[3].long_name);
        // console.log("Country:", res.data.results[0].address_components[4].long_name);
        // console.log("Postal Code:", res.data.results[0].address_components[5].long_name);
      });
  })
  .catch(err => {
    console.log(err.message);
  });

export default function Registration(props) {
  let userEntry = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    address: "",
    postalCode: "",
    city: "",
    province: ""
  };

  const [userForm, updateForm] = useState(userEntry);

  const handleSubmission = function(event) {
    event.preventDefault();
    console.log(userForm);

    axios
      .post("/api/users", { userForm })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  return (
    <main className="">
      <section className="">
        <form className="registration_fields" onSubmit={handleSubmission}>
          <input
            placeholder="First Name"
            value={userForm.firstName}
            onChange={event =>
              updateForm({ ...userForm, firstName: event.target.value })
            }
            required
          />
          <input
            placeholder="Last Name"
            value={userForm.lastName}
            onChange={event =>
              updateForm({ ...userForm, lastName: event.target.value })
            }
            required
          />
          <input
            placeholder="Email"
            value={userForm.email}
            onChange={event =>
              updateForm({ ...userForm, email: event.target.value })
            }
            required
          />
          <input
            placeholder="Password"
            value={userForm.password}
            onChange={event =>
              updateForm({ ...userForm, password: event.target.value })
            }
            required
          />
          <input
            placeholder="Confirm Password"
            value={userForm.passwordConfirmation}
            onChange={event =>
              updateForm({
                ...userForm,
                passwordConfirmation: event.target.value
              })
            }
            required
          />
          <input
            placeholder="Address"
            value={userForm.address}
            onChange={event =>
              updateForm({ ...userForm, address: event.target.value })
            }
            required
          />
          <input
            placeholder="Postal Code"
            value={userForm.postalCode}
            onChange={event =>
              updateForm({ ...userForm, postalCode: event.target.value })
            }
            required
          />
          <input
            placeholder="City"
            value={userForm.city}
            onChange={event =>
              updateForm({ ...userForm, city: event.target.value })
            }
            required
          />
          <input
            placeholder="Province"
            value={userForm.province}
            onChange={event =>
              updateForm({ ...userForm, province: event.target.value })
            }
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
