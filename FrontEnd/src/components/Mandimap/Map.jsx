import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "600px",
  height: "600px",
};

const center = {
  lat: 19.745,
  lng: 72.523,
};

function MyComponent() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await axios.get("/api/getuserlocation");
        const { latitude, longitude } = response.data;
        console.log(latitude + " " + longitude);
        // Set the user's location in the state
        setUserLocation({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    getUserLocation();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBNFWDyiI6zOqNHToYldLr_YEjlfNehCHM",
  });

  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [shortestDistance, setShortestDistance] = useState(null);
  const [startLocationName, setStartLocationName] = useState("");
  const [endLocationName, setEndLocationName] = useState("");

  useEffect(() => {
    if (isLoaded) {
      const directionsServiceInstance =
        new window.google.maps.DirectionsService();
      const directionsRendererInstance =
        new window.google.maps.DirectionsRenderer();
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
    }
  }, [isLoaded]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
    setDirectionsService(null);
    setDirectionsRenderer(null);
  }, []);

  const calculateAndDisplayRoute = () => {
    if (directionsService && directionsRenderer && userLocation) {
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(
            userLocation.lat,
            userLocation.lng
          ),
          destination: new window.google.maps.LatLng(19.75, 75.14), // Change to your desired destination
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const distance = result.routes[0].legs[0].distance.text;
            setShortestDistance(distance);

            // Fetch and set start location name
            fetchLocationName(
              result.routes[0].legs[0].start_location,
              setStartLocationName
            );

            // Fetch and set end location name
            fetchLocationName(
              result.routes[0].legs[0].end_location,
              setEndLocationName
            );
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  };

  const fetchLocationName = (location, setName) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: location.lat(), lng: location.lng() } },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            setName(results[0].formatted_address);
          }
        } else {
          console.error(`Error fetching location details: ${status}`);
        }
      }
    );
  };

  useEffect(() => {
    if (directionsService && directionsRenderer) {
      calculateAndDisplayRoute();
      directionsRenderer.setMap(map);
    }
  }, [directionsService, directionsRenderer, map]);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>{/* Add your markers or other components here */}</>
      </GoogleMap>

      {shortestDistance && startLocationName && endLocationName && (
        <div>
          <p>Start Location: {startLocationName}</p>
          <p>End Location: {endLocationName}</p>
          <p>Shortest Distance: {shortestDistance}</p>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
