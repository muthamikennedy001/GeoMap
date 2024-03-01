import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import GeoMaps from "./GeoMaps";
import { Alert } from "react-bootstrap";

function AddGeoMap() {
  let btnRef = { useRef };
  let { name } = useParams();
  const history = useHistory();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [mapInfo, setMapInfo] = useState([]);

  console.log(name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${process.env.REACT_APP_GOOGLEAPI}`
        );
        if (!locationResponse.ok) {
          throw new Error("Failed to fetch location data");
        }
        const locationData = await locationResponse.json();
        setLatitude(locationData.results[0].geometry.location.lat);
        setLongitude(locationData.results[0].geometry.location.lng);
        console.log(locationData.results[0].geometry.location.lat);
        console.log(locationData.results[0].geometry.location.lng);
        const mapResponse = await axios.post(
          "http://localhost:2000/api/getMapInfo",
          { name: name }
        );
        setMapInfo(mapResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      setLatitude(null);
      setLongitude(null);
      setMapInfo(null);
    };
  }, [name]);

  const [state, setState] = useState([]);
  const { paths } = state;
  const new_path = JSON.stringify(state.paths);

  const saveMap = async () => {
    await axios
      .post("http://localhost:2000/api/addMap", {
        parentId: mapInfo.data.result[0].id,
        coordinates: new_path,
      })
      .then((response) => {
        if (response) {
          alert(`${response.data.msg}`);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
  };
  return (
    <div>
      <GeoMaps
        apiKey={process.env.REACT_APP_GOOGLEAPI}
        latitude={latitude} // Pass latitude as a prop
        longitude={longitude} // Pass longitude as a prop
        paths={paths}
        point={(paths) => setState({ paths })}
      />
      {paths && paths.length > 1 ? (
        <button ref={btnRef} onClick={saveMap}>
          Save Map
        </button>
      ) : null}
      <button onClick={() => history.push("/")}>Go Back</button>
    </div>
  );
}

export default AddGeoMap;
