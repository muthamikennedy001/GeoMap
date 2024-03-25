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
            mapContainerClassName="App-Edit"
            center={points[0]}
            zoom={12}
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
      <button
        class="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={() => setModalView(false)}
      >
        close
      </button>
    </div>
  );
}

export default ViewMap;
