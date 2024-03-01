import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ViewAllMaps() {
  const history = useHistory();
  const [geoState, setGeoState] = useState();

  const ViewAllMaps = () => {
    axios.get("http://localhost:2000/api/viewAllMaps").then((response) => {
      //console.log(response.data)
      let allGeoMaps = [];

      response.data.map((maps) => {
        console.log(maps.coordinates);
        allGeoMaps.push({ coordinates: JSON.parse(maps.coordinates) });
      });
      setGeoState(allGeoMaps);
    });
  };

  useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      if (!unmounted) return ViewAllMaps();
    }, 50);
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    console.log("geoState:", geoState);
  }, [geoState]);

  return (
    <div className="App-map">
      <h2>Total Maps: {geoState && geoState.length}</h2>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLEAPI}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={{ lat: -1.2830445729432605, lng: 36.82588725766635 }}
          zoom={9}
        >
          {geoState !== undefined
            ? geoState.map((cords, index) => (
                <Polygon
                  key={index}
                  path={cords.coordinates}
                  options={{
                    fillColor: "#2196F3",
                    strokeColor: "#2196F3",
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                  }}
                />
              ))
            : null}
        </GoogleMap>
      </LoadScript>
      <button onClick={() => history.push("/")}>Go Back</button>
    </div>
  );
}

export default ViewAllMaps;
