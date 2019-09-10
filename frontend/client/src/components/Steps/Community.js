import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setUser } from "../../store/app";
let REACT_APP_G_API_KEY = process.env.REACT_APP_G_API_KEY;

export default function Community(props) {
  const { options, onMount, className } = props;

  const user = useSelector(state => state.app.user);

  let communityEntry = {
    ...user,
    name: "Mile End",
    postal_code: "H2T"
  };

  const dispatch = useDispatch();

  const propsRef = { ref: useRef(), className };
  const onLoad = () => {
    const map = new window.google.maps.Map(propsRef.ref.current, options);
    onMount && onMount(map);
    let rectangle = new window.google.maps.Rectangle({
      strokeColor: "#BDBE87",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#E2E3A1",
      fillOpacity: 0.35,
      map: map,
      bounds: {
        north: 33.685,
        south: 33.671,
        east: -116.234,
        west: -116.251
      }
    });

    let citymap = {
      montreal: {
        center: { lat: 45.5250827, lng: -73.600208 },
        population: 1000000
      }
    };
    for (let city in citymap) {
      let cityCircle = new window.google.maps.Circle({
        strokeColor: "#BDBE87",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#E2E3A1",
        fillOpacity: 0.35,
        map: map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 0.2
      });
    }
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_G_API_KEY}`;
    //   script.src = `https://maps.googleapis.com/maps/api/js?key=KEY`;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  });

  return (
    <main>
      <section className="">
        <p>Welcome to your neighbourhood, <strong>{communityEntry.name}</strong>!</p>

        <div
          {...propsRef}
          style={{ height: `300px`, margin: `1em 0`, borderRadius: `0.5em` }}
        />
      </section>
      <footer>
        <button onClick={props.onBack} className="back-btn">
          Back
        </button>
        <button
          onClick={props.onNext}
          value={() => dispatch(setUser(communityEntry))}
          className="next-btn"
        >
          Next
        </button>
      </footer>
    </main>
  );
}

Community.defaultProps = {
  options: {
    center: { lat: 45.5250827, lng: -73.600208 },
    zoom: 16,
    types: ["address"],
    componentRestrictions: {
      country: "montreal"
    },
    styles: [
      {
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ff4400"
              },
              {
                  "saturation": -68
              },
              {
                  "lightness": -4
              },
              {
                  "gamma": 0.72
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.icon"
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#0077ff"
              },
              {
                  "gamma": 3.1
              }
          ]
      },
      {
          "featureType": "water",
          "stylers": [
              {
                  "hue": "#00ccff"
              },
              {
                  "gamma": 0.44
              },
              {
                  "saturation": -33
              }
          ]
      },
      {
          "featureType": "poi.park",
          "stylers": [
              {
                  "hue": "#44ff00"
              },
              {
                  "saturation": -23
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "hue": "#007fff"
              },
              {
                  "gamma": 0.77
              },
              {
                  "saturation": 65
              },
              {
                  "lightness": 99
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "gamma": 0.11
              },
              {
                  "weight": 5.6
              },
              {
                  "saturation": 99
              },
              {
                  "hue": "#0091ff"
              },
              {
                  "lightness": -86
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": -48
              },
              {
                  "hue": "#ff5e00"
              },
              {
                  "gamma": 1.2
              },
              {
                  "saturation": -23
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "saturation": -64
              },
              {
                  "hue": "#ff9100"
              },
              {
                  "lightness": 16
              },
              {
                  "gamma": 0.47
              },
              {
                  "weight": 2.7
              }
          ]
      }
  ]
  }
};
