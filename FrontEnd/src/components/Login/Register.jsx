import React from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import axios from "axios";

function Register() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Display alert and send location data to the server
        const allowLocation = window.confirm(
          `Allow Access to your Location!!`
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
    <div>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-green-600 text-center mb-6">Register</h1>

        <form action="">
          <div className="relative my-9">
            <input
              type="username"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="username"
              className="absolute left-0 text-sm text-white duration-300 transform -translate-y-9  scale-100 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100  peer-placeholder-shown:top-0  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
            >
              Your Username
            </label>
            <BiUser className="absolute top-0 right-4 bottom-8" />
          </div>

          <div className="relative my-9">
            <input
              type="email"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="email"
              className="absolute left-0 text-sm text-white duration-300 transform -translate-y-9  scale-100 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100  peer-placeholder-shown:top-0  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
            >
              Email
            </label>
            <CgMail className="absolute top-0 right-4 bottom-8" />
          </div>

          <div className="relative my-8">
            <input
              type="name"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer "
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-9 scale-100 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
            >
              State Name
            </label>
            <FaMapMarkerAlt className="absolute top-0 right-4 bottom-8" />
          </div>

          <div className="relative my-8">
            <input
              type="name"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer "
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-9 scale-100 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
            >
              City
            </label>
            <FaMapMarkerAlt className="absolute top-0 right-4 bottom-8" />
          </div>

          <div className="relative my-8">
            <input
              type="name"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer "
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-9 scale-100 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
            >
              Address
            </label>
            <FaHome className="absolute top-0 right-4 bottom-8" />
          </div>

          <div className="relative my-8">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer "
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-9 scale-100 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
            >
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-0 right-4 bottom-8" />
          </div>

          <div className="relative my-8">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer "
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-9 scale-100 top-5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
            >
              Confirm Password
            </label>
            <AiOutlineUnlock className="absolute top-0 right-4 bottom-8" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="" id="" />
              <label htmlFor="Remember Me">Remember Me</label>
            </div>
            <Link to="" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
            type="submit"
          >
            Register
          </button>

          <div>
            <span className="m-4">
              Already Created ?{" "}
              <Link className="text-blue-500" to="/Login">
                Login
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
