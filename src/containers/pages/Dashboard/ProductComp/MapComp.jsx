import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete, Marker, InfoWindow } from "@react-google-maps/api";

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
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
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
        keyword: "optik", // Kata kunci pencarian (misalnya "optical store" untuk optik kacamata)
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
          const markerData = opticalStoreData.map((opticalStore) => opticalStore.location);
          setMarkers(markerData);
        }
      });
    }
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(location);
      if (map) {
        map.panTo(location);
        map.setZoom(12);
      }
      setMarkers([
        ...markers,
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      ]);

      // Mencari lokasi optik kacamata terdekat berdasarkan lokasi yang dipilih
      findNearestOpticalStores(location);
    } else {
      console.log("Place not found");
    }
  };

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
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
          findNearestOpticalStores(userLocation);
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
          placeholder="Search location optik"
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
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          onClick={() => onMarkerClick(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            {opticalStores.map((store) =>
              store.location.lat === selectedMarker.lat &&
              store.location.lng === selectedMarker.lng ? (
                <div key={store.id}>
                  <h3>{store.name}</h3>
                  <p>{store.address}</p>
                </div>
              ) : null
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComp;