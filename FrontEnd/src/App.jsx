import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import image from "./components/images/pics.jpg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Register from "./components/Login/Register";

function App() {
  useEffect(() => {
    // Ask for device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Display alert and send location data to the server
        const allowLocation = window.confirm(
          `Your location is ${latitude}, ${longitude}. Do you want to allow this location?`
        );

        if (allowLocation) {
          try {
            const response = await axios.post(
              "http://localhost:5000/api/location",
              {
                latitude,
                longitude,
              }
            );

            console.log("Location data saved:", response.data);
          } catch (error) {
            console.error("Error saving location data:", error.response.data);
          }
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
