import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SoilDataAvailable from "./SoilDataAvailable";
import SoilDataNotAvailable from "./SoilDataNotAvailable";

function ParcelSoilData() {
  const [farmParcelId, setFarmParcelId] = useState("");
  const [soilData, setSoilData] = useState(null); // Initialize soilData as null
  const { mapId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch parcel data
        const parcelResponse = await axios.get(
          `http://localhost:2000/api/parcel/${mapId}`
        );
        const { farmParcelId } = parcelResponse.data;

        // Logging the extracted data
        console.log("Farm Parcel ID:", farmParcelId);
        setFarmParcelId(farmParcelId);

        // Fetch soil data
        const soilDataResponse = await axios.get(
          `http://localhost:2000/api/soildata/${farmParcelId}`
        );
        console.log(soilDataResponse.data);

        // Check if soilDataResponse.data is defined and not null
        if (
          soilDataResponse.data &&
          typeof soilDataResponse.data === "object"
        ) {
          // Exclude unwanted fields from the data
          const filteredData = Object.entries(soilDataResponse.data)
            .filter(
              ([key]) =>
                ![
                  "createdAt",
                  "updatedAt",
                  "soilDataId",
                  "farmParcelId",
                ].includes(key)
            )
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
          setSoilData(filteredData);
        } else {
          // Handle case when soilDataResponse.data is null or not an object
          console.log("No soil data found for farmParcelId:", farmParcelId);
          setSoilData(null); // Set soilData to null
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mapId]);

  useEffect(() => {
    console.log("soilData", soilData);
  }, [soilData]);

  return (
    <div>
      {/* Conditionally render components based on soilData */}
      {soilData !== null ? (
        <SoilDataAvailable soilData={soilData} mapId={mapId} />
      ) : (
        <SoilDataNotAvailable farmParcelId={farmParcelId} mapId={mapId} />
      )}
    </div>
  );
}

export default ParcelSoilData;
