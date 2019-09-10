import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/app";
import { useVisualMode } from "../../hooks/useVisualMode";

import axios from "axios";
require("dotenv").config();
let REACT_APP_G_API_KEY = process.env.REACT_APP_G_API_KEY;



export default function AutoAddress(props) {
  const dispatch = useDispatch();

  let reduxAutoAddressEntry = {
    address: "",
    postal_code: "",
    city: "",
    province: ""
  };

  const [reduxAutoAddress, updateAutoAddress] = useState(reduxAutoAddressEntry);


  const [autoAddress, setAutoAddress] = useState("");

  // Verifies the geolocation (user's current location)
  let currentLocation = function(selected) {
    console.log("HEYY")
    // console.log("USEVISUALMODE:", useVisualMode())
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, selected);
    });
  };

  let autoAddressField = null;

// Provide address (reverse geocoding) based on geolocation (user's current coordinates)
  currentLocation()
  .then(position => {
    console.log("YO")

    console.log("position.coords.latitude:", position.coords.latitude);
    console.log("position.coords.longitude:", position.coords.longitude);
    axios
      .get(
        // Only for temporary use
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=KEY`

        // Enable the following and comment out the one above if you want to make request from Google API (results are displayed in the console):
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${REACT_APP_G_API_KEY}`
      )
      .then(res => {
        // // This formatted address isn't always ideal data. Perhaps it's better to concatenate pieces of data below (Street Number, Address, etc.)
        // console.log("Formatted Address:", res.data.results[0].formatted_address);
        // // Coordinates
        // console.log("Latitude:", res.data.results[0].geometry.location.lat);
        // console.log("Longitude:", res.data.results[0].geometry.location.lng);
        // // Pieces of data for various fields
        let address = `${res.data.results[0].address_components[0].long_name} ${res.data.results[0].address_components[1].long_name}`;
        let city = res.data.results[0].address_components[2].long_name;
        let province = res.data.results[0].address_components[3].long_name;
        let country = res.data.results[0].address_components[4].long_name;
        let postal_code = res.data.results[0].address_components[5].long_name;


        autoAddressField = `${address} ${city} ${province} ${country} ${postal_code}`;
        setAutoAddress(autoAddressField)

        // reduxAutoAddressEntry = {
        //   address: address,
        //   postal_code: postal_code,
        //   city: city,
        //   province: province
        // };
      
        // updateAutoAddress(reduxAutoAddressEntry)
      });
  })
  .catch(err => {
    console.log(err.message);
  });




  return (
    <main>
      <section className="">
        <p>One moment, here you go!</p>
        <ul>
          <li>
          <input className="disabled-input" placeholder="Address" value={autoAddress} disabled="disabled" />
          </li>
          <li>
          <button className="btn-edit" onClick={props.onEdit}>Edit</button>

          </li>
        </ul>

      </section>

      <footer>
        <button onClick={props.onBack} value="" className="back-btn">
          Back
        </button>
        <button onClick={props.onNext} className="next-btn">
          Next
        </button>
      </footer>
    </main>
  );
}
