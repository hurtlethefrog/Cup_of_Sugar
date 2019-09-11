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

  // String passed to input
  const [autoAddress, setAutoAddress] = useState("");

  // Object to send to traverse through components and send to database during user entry
  const [reduxAutoAddress, updateAutoAddress] = useState(reduxAutoAddressEntry);

  // to avoid Google API looping
  const [loading, setLoading] = useState(true);



  // Verifies the geolocation (user's current location)
  let currentLocation = function(selected) {
    console.log("HEYY");
    // console.log("USEVISUALMODE:", useVisualMode())
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, selected);
    });
  };

  let autoAddressField = null;

  useEffect(() => {

    if(!loading) {

      dispatch(setUser(reduxAutoAddress));
   
    }

  }, [loading])

  // Provide address (reverse geocoding) based on geolocation (user's current coordinates)
  useEffect(() => {
    currentLocation()
      .then(position => {
        console.log("Current latitude:", position.coords.latitude);
        console.log("Current longitude:", position.coords.longitude);

        axios
          .get(
            // Only for temporary use
            // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=KEY`

            // Enable the following and comment out the one above if you want to make request from Google API (results are displayed in the console):
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${REACT_APP_G_API_KEY}`
          )
          .then(res => {
            let address = `${res.data.results[0].address_components[0].long_name} ${res.data.results[0].address_components[1].long_name}`;
            let city = res.data.results[0].address_components[2].long_name;
            let province = res.data.results[0].address_components[3].long_name;
            let postal_code =
              res.data.results[0].address_components[5].long_name;

            autoAddressField = `${address} ${city} ${province} ${postal_code}`;
            setAutoAddress(autoAddressField);

            updateAutoAddress({
              address: address,
              postal_code: postal_code,
              city: city,
              province: province
            });

            console.log("SEEE!")   
                     
          })
          .then(() => {
            setLoading(false);
            // dispatch(setUser(reduxAutoAddress));
          })
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <main>
      <section className="">
        <ul>
          <li>
            <input
              className="disabled-input"
              placeholder="Please wait a moment for autocompletion..."
              value={autoAddress}
              disabled="disabled"
            />
          </li>

          {/* <li>
            <button className="btn-edit" onClick={props.onEdit}>Edit</button>
          </li> */}
        </ul>
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
