import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux"
import Axios from 'axios';
let REACT_APP_G_API_KEY = process.env.REACT_APP_G_API_KEY;

// https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${}&key=${REACT_APP_G_API_KEY}

// https://maps.googleapis.com/maps/api/geocode/json?address=77379&sensor=true&key=${REACT_APP_G_API_KEY}

export default function Community(props) {
// export default function Community({ options, onMount, className }) {

  // const user = useSelector(state => state.app.user)
  // console.log(user);
  
  // const props = { ref: useRef(), className }
  // const onLoad = () => {
  //   const map = new window.google.maps.Map(props.ref.current, options)
  //   onMount && onMount(map)
  // }

  // useEffect(() => {
  //   if (!window.google) {
  //     const script = document.createElement(`script`)
  //     script.type = `text/javascript`
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_G_API_KEY}`
  //     const headScript = document.getElementsByTagName(`script`)[0]
  //     headScript.parentNode.insertBefore(script, headScript)
  //     script.addEventListener(`load`, onLoad)
  //     return () => script.removeEventListener(`load`, onLoad)
  //   } else onLoad()
  // })


  return (
    <main>
      <section className="">
        <h1>Community</h1>
        <p>Great! You are part of neighbourhood Medieval!</p>

        <div
          // {...props}
          // style={{ height: `300px`, margin: `1em 0`, borderRadius: `0.5em` }}
        />
      </section>
      <footer>
      <button onClick={props.onBack} className="back-btn">Back</button>
      <button onClick={props.onNext} className="next-btn">Next</button>
      </footer>
    </main>
  );
}

// Community.defaultProps = {
//   options: {
//     center: { lat: 48, lng: 8 },
//     zoom: 5,
//     types: ['address'],
//     componentRestrictions: {
//       country: 'montreal'
//     }
//   },
// }