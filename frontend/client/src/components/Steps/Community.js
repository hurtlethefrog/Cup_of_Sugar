import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setUser } from "../../store/app";
let REACT_APP_G_API_KEY = process.env.REACT_APP_G_API_KEY;

// https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${}&key=${REACT_APP_G_API_KEY}

// https://maps.googleapis.com/maps/api/geocode/json?address=77379&sensor=true&key=${REACT_APP_G_API_KEY}

// export default function Community(props) {

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
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
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
      // Add the circle for this city to the map.
      let cityCircle = new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
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
      script.src = `https://maps.googleapis.com/maps/api/js?key=$BLAH`;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  });

  return (
    <main>
      <section className="">
        <h1>Community</h1>
        <p>Great! You are part of neighbourhood {communityEntry.name}!</p>

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
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6195a0"
          }
        ]
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            lightness: "0"
          },
          {
            saturation: "0"
          },
          {
            color: "#f5f5f2"
          },
          {
            gamma: "1"
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [
          {
            lightness: "-3"
          },
          {
            gamma: "1.00"
          }
        ]
      },
      {
        featureType: "landscape.natural.terrain",
        elementType: "all",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#bae5ce"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100
          },
          {
            lightness: 45
          },
          {
            visibility: "simplified"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#fac9a9"
          },
          {
            visibility: "simplified"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text",
        stylers: [
          {
            color: "#4e4e4e"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#787878"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified"
          }
        ]
      },
      {
        featureType: "transit.station.airport",
        elementType: "labels.icon",
        stylers: [
          {
            hue: "#0a00ff"
          },
          {
            saturation: "-77"
          },
          {
            gamma: "0.57"
          },
          {
            lightness: "0"
          }
        ]
      },
      {
        featureType: "transit.station.rail",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#43321e"
          }
        ]
      },
      {
        featureType: "transit.station.rail",
        elementType: "labels.icon",
        stylers: [
          {
            hue: "#ff6c00"
          },
          {
            lightness: "4"
          },
          {
            gamma: "0.75"
          },
          {
            saturation: "-68"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#eaf6f8"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c7eced"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            lightness: "-49"
          },
          {
            saturation: "-53"
          },
          {
            gamma: "0.79"
          }
        ]
      }
    ]
  }
};
