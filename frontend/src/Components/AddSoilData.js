import React, { useState } from "react";
import ViewAllMaps from "./ViewAllMaps";
import "../Index.css";
import axios from "axios";

function AddSoilData() {
  const [parcelID, setParcelID] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [soilType, setSoilType] = useState("");
  const [pH, setPH] = useState("");
  const [nitrogenLevel, setNitrogenLevel] = useState("");
  const [potassiumLevel, setPotassiumLevel] = useState("");
  const [phosphorusLevel, setPhosphorusLevel] = useState("");
  let message = "";

  const submitSoilData = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:2000/api/checkParcel/${parcelID}`)
      .then((response) => {
        if (response.data.exists) {
          alert(
            "Data for this parcel already exists. Please enter a different parcel ID."
          );
        } else {
          // If data doesn't exist, proceed with inserting new data
          axios
            .post("http://localhost:2000/api/addSoilData", {
              farmParcelId: parcelID,
              temperature: temperature,
              humidity: humidity,
              moisture: moisture,
              soilType: soilType,
              pH: pH,
              nitrogenLevel: nitrogenLevel,
              potassiumLevel: potassiumLevel,
              phosphorusLevel: phosphorusLevel,
            })
            .then((response) => {
              if (response) {
                message = response.data.msg; // Set message state to display success message
                // Reset form fields
                setParcelID("");
                setTemperature("");
                setHumidity("");
                setMoisture("");
                setSoilType("");
                setPH("");
                setNitrogenLevel("");
                setPotassiumLevel("");
                setPhosphorusLevel("");
                e.target.reset();
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div class="h-screen md:flex">
      <div class="relative overflow-hidden md:flex w-1/2 bg-green-50 justify-around items-center hidden">
        <div>
          {/* <h1 class="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p class="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button


            type="submit"
            class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button> */}
          <ViewAllMaps />
        </div>
      </div>
      <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form class="bg-white" onSubmit={submitSoilData}>
          <h1 class="text-gray-800 font-bold text-2xl mb-1">
            Add Farm Parcel Soil Data
          </h1>
          <p class="mb-7"></p>
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Parcel ID
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Parcel ID"
                id="parcelID"
                onChange={(e) => setParcelID(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Temperature
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Temperature (°C)"
                id="temperature"
                min="-100"
                max="100"
                onChange={(e) => setTemperature(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Humidity
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Humidity (%)"
                id="humdity"
                min="0"
                max="100"
                onChange={(e) => setHumidity(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Moisture
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Moisture (%)"
                id="moisture"
                min="0"
                max="100"
                onChange={(e) => setMoisture(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Soil Type
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Soil Type"
                id="soilType"
                onChange={(e) => setSoilType(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                pH
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="pH Level"
                step="0.1"
                id="pH"
                min="0.0"
                max="14.0"
                onChange={(e) => setPH(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nitrogen Level
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Nitrogen Level (%)"
                id="nitrogenLevel"
                min="0.0"
                max="1000.0"
                onChange={(e) => setNitrogenLevel(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Potassium Level
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Potassium Level (%)"
                id="potassiumLevel"
                min="0.0"
                max="1000.0"
                onChange={(e) => setPotassiumLevel(e.target.value)}
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phosphorus Level
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Phosphorus Level (%)"
                id="phosphorusLevel"
                min="0.0"
                max="1000.0"
                onChange={(e) => setPhosphorusLevel(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
            disabled={
              parcelID === "" ||
              temperature === "" ||
              humidity === "" ||
              moisture === "" ||
              soilType === "" ||
              pH === "" ||
              nitrogenLevel === "" ||
              potassiumLevel === "" ||
              phosphorusLevel === ""
            }
          >
            Save Soil Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSoilData;
