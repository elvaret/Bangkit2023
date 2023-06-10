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
