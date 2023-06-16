import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "70%",
  height: "70vh",
  margin: "0 auto",
  borderRadius: "30px",
  border: "10px solid #F2DA7A",
};

function MapComp() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBdV1vWkPU2_uOEDlfip5b3A9NKr8HauM0",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [opticalStores, setOpticalStores] = useState([]);
  const autocompleteRef = useRef(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const findNearestOpticalStores = (location) => {
    if (window.google && window.google.maps) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: location,
        radius: 10000, // Jarak pencarian (dalam meter)
        keyword: "optik",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const opticalStoreData = results.map((opticalStore) => ({
            id: opticalStore.place_id,
            name: opticalStore.name,
            address: opticalStore.vicinity,
            location: {
              lat: opticalStore.geometry.location.lat(),
              lng: opticalStore.geometry.location.lng(),
            },
          }));

          setOpticalStores(opticalStoreData);

          // Menampilkan marker pada setiap hasil optik yang ditemukan
          const markerData = opticalStoreData.map(
            (opticalStore) => opticalStore.location
          );
          setMarkers(markerData);
        }
      });
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
          if (map) {
            map.panTo(userLocation);
            map.setZoom(12);
          }
          setMarkers([userLocation]);

          // Mencari lokasi optik kacamata terdekat berdasarkan lokasi pengguna
          findNearestOpticalStores(userLocation);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map]);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >

      {opticalStores.map((store) => (
        <Marker
          key={store.id}
          position={store.location}
          onClick={() => onMarkerClick(store.location)}
        >
          {selectedMarker &&
            selectedMarker.lat === store.location.lat &&
            selectedMarker.lng === store.location.lng && (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div>
                  <h6>{store.name}</h6>
                  <p>{store.address}</p>
                </div>
              </InfoWindow>
            )}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComp;
