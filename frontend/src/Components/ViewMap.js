import React from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
function ViewMap({ points, setModalView }) {
  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLEAPI}
        language="en"
        region="us"
      >
        {points.length > 1 ? (
          <GoogleMap
            mapContainerClassName="App-map"
            center={points[0]}
            zoom={20}
          >
            <Polygon
              path={points}
              options={{
                fillColor: "#011c03",
                strokeColor: "#2196F3",
                fillOpacity: 0.8,
                strokeWeight: 2,
                // editable: false,
                // draggable: false,
                // clickable: false,
              }}
            />
          </GoogleMap>
        ) : null}
      </LoadScript>
      <button onClick={() => setModalView(false)}>close</button>
    </div>
  );
}

export default ViewMap;
