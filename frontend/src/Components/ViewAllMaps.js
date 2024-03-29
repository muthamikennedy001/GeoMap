import {
  GoogleMap,
  LoadScript,
  OverlayView,
  Polygon,
} from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ViewAllMaps() {
  const history = useHistory();
  const [geoState, setGeoState] = useState();
  const ViewAllMaps = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/viewAllMaps");
      //console.log(response.data)
      let allGeoMaps = [];

      response.data.map((maps) => {
        console.log(maps.coordinates);
        allGeoMaps.push({ coordinates: JSON.parse(maps.coordinates) });
      });
      setGeoState(allGeoMaps);
    } catch (error) {
      // Handle error
      console.error("Error fetching all maps:", error);
      // Further error handling if needed
    }
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
            ? geoState.map((cords, index) => {
                return (
                  <React.Fragment key={index}>
                    <Polygon
                      //key={index}
                      path={cords.coordinates}
                      options={{
                        fillColor: "#011c03",
                        strokeColor: "#2196F3",
                        fillOpacity: 0.8,
                        strokeWeight: 2,
                      }}
                    />
                    <OverlayView
                      position={cords.coordinates[0]}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div
                        style={{
                          background: "#203254",
                          padding: "4px 4px",
                          fontSize: "8px",
                          color: "white",
                          borderradius: "10px",
                        }}
                      >
                        {index + 1}
                      </div>
                    </OverlayView>
                  </React.Fragment>
                );
              })
            : null}
        </GoogleMap>
      </LoadScript>
      <button onClick={() => history.push("/")}>Go Back</button>
    </div>
  );
}

export default ViewAllMaps;
