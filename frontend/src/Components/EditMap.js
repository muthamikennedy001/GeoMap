import React from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import { useCallback } from "react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";

function EditMap({
  apiKey,
  paths,
  point,
  center,
  setPoint,
  close,
  id,
  //   color,
  //   setColor,
}) {
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  var new_path = JSON.stringify(point);
  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPoint(nextPath);
    }
  }, [setPoint]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      setPoint(paths);
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit, paths, setPoint]
  );
  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  // console.log('editColor',editColor)

  const refreshPage = () => {
    window.location.reload();
  };

  const updateMap = async () => {
    await axios
      .post("http://localhost:2000/api/updateGeoMap", {
        mapId: id,
        coordinates: new_path,
      })
      .then((response) => {
        if (response) {
          console.log(response.data);
          alert(response.data.msg);
          refreshPage();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={apiKey}
        language="en"
        region="us"
      >
        {paths.length > 1 ? (
          <GoogleMap
            mapContainerClassName="App-Edit "
            center={center}
            zoom={12}
          >
            <Polygon
              path={point}
              editable
              onMouseUp={onEdit}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                // fillColor: editColor ? editColor : color,
                strokeColor: `#0a6ebd`,
                fillOpacity: 0.5,
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        ) : (
          <h2>No Geofence added</h2>
        )}
      </LoadScript>
      <br />

      <br />
      <button
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={updateMap}
      >
        Update
      </button>
      <button
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={close}
      >
        Close
      </button>
    </div>
  );
}

export default EditMap;
