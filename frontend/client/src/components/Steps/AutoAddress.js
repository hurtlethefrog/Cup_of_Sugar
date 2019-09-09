import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/app";

import axios from "axios";
require("dotenv").config();
let REACT_APP_G_API_KEY = process.env.REACT_APP_G_API_KEY;

// Verifies the geolocation (user's current location)
let currentLocation = selected => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, selected);
  });
};

let autoAddressField = null;

// Provide address (reverse geocoding) based on geolocation (user's current coordinates)
currentLocation()
  .then(position => {
    axios
      .get(
        // Only for temporary use
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=KEY`

        // Enable the following and comment out the one above if you want to make request from Google API (results are displayed in the console):
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${REACT_APP_G_API_KEY}`
      )
      .then(res => {
        // // This formatted address isn't always ideal data. Perhaps it's better to concatenate pieces of data below (Street Number, Address, etc.)
        // console.log("Formatted Address:", res.data.results[0].formatted_address);
        // // Coordinates
        // console.log("Latitude:", res.data.results[0].geometry.location.lat);
        // console.log("Longitude:", res.data.results[0].geometry.location.lng);
        // // Pieces of data for various fields
        // let streetNumber = res.data.results[0].address_components[0].long_name;
        // let address = res.data.results[0].address_components[1].long_name;
        // let city = res.data.results[0].address_components[2].long_name;
        // let provinceState = res.data.results[0].address_components[3].long_name;
        // let country = res.data.results[0].address_components[4].long_name;
        // let postalCode = res.data.results[0].address_components[5].long_name;
        // autoAddressField = `${streetNumber} ${address} ${city} ${provinceState} ${country} ${postalCode}`;
      });
  })
  .catch(err => {
    console.log(err.message);
  });

export default function AutoAddress(props) {
  return (
    <main>
      <section className="">
        <h1>AutoAddress</h1>
        <input
          placeholder="Address"
          value={useState(autoAddressField)}
          disabled="disabled"
        />
        <button onClick={props.onEdit}>Edit</button>
      </section>

      <footer>
        <button onClick={props.onBack} className="back-btn">
          Back
        </button>
        <button onClick={props.onNext} className="next-btn">
          Next
        </button>
      </footer>
    </main>
  );
}
