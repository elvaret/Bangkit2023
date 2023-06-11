import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "1260px",
  height: "460px",
};

function MapComp() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBdV1vWkPU2_uOEDlfip5b3A9NKr8HauM0",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const autocompleteRef = useRef(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(location);
      map.panTo(location);
      map.setZoom(12);
    } else {
      console.log("Place not found");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "0%",
            top: "10%",
            marginLeft: "10px",
          }}
        />
      </Autocomplete>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComp;
=======
import React, { useEffect, useState } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import "../Dashboard.css";

const MapComp = ({ google }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const map = new google.maps.Map(document.getElementById("map"), {
              center: userLatLng,
              zoom: 15,
            });

            const userMarker = new google.maps.Marker({
              position: userLatLng,
              map: map,
              title: "Lokasi Anda",
            });

            const placesService = new google.maps.places.PlacesService(map);

            const request = {
              location: userLatLng,
              radius: "100000",
              type: ["optik"],
            };

            let lastInfoWindow;

            placesService.nearbySearch(request, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                results.forEach((place) => {
                  const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                  });

                  const infoWindow = new google.maps.InfoWindow({
                    content: place.name,
                  });

                  marker.addListener("click", () => {
                    if (lastInfoWindow) {
                      lastInfoWindow.close();
                    }

                    infoWindow.open(map, marker);

                    const directionsService =
                      new google.maps.DirectionsService();
                    const directionsRenderer =
                      new google.maps.DirectionsRenderer();

                    displayRoute(
                      directionsService,
                      directionsRenderer,
                      userLatLng,
                      place.geometry.location
                    );

                    lastInfoWindow = infoWindow;
                  });
                });
              }
            });
          },
          () => {
            console.error("Gagal mendapatkan lokasi pengguna.");
          }
        );
      } else {
        console.error("Geolocation tidak didukung oleh browser.");
      }
    };

    const displayRoute = (
      directionsService,
      directionsRenderer,
      origin,
      destination
    ) => {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    };

    initMap();
  }, [google]);

  const handleMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  return (
    <div>
      <Map google={google} zoom={14}>
        <Marker onClick={handleMarkerClick} name={"Marker"} />

        <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
          <div>
            <h1>{selectedPlace && selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBdV1vWkPU2_uOEDlfip5b3A9NKr8HauM0",
})(MapComp);