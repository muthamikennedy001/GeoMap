import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  DrawingManager,
  DrawingManagerF,
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";

function GeoMaps({ apiKey, latitude, longitude, paths = [], point }) {
  const [path, setPath] = useState(paths);
  const [state, setState] = useState({
    drawingMode: "polygon",
  });

  const libraries = ["drawing"];
  const options = {
    drawingControl: true,
    drawingControlOptions: {
      drawingMode: ["polygon"],
    },
    polygonOptions: {
      fillColor: "#2196F3",
      strokeColor: "#2196F3",
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: true,
      editable: true,
      draggable: true,
      zindex: 1,
    },
  };
  useEffect(() => {
    // Log latitude and longitude to ensure they are valid
    console.log("Latitude in GeoMaps:", latitude);
    console.log("Longitude in GeoMaps:", longitude);
  }, [latitude, longitude]);

  // Ensure latitude and longitude are valid numbers
  const validLatitude =
    typeof latitude === "number" && !isNaN(latitude) ? latitude : 0;
  const validLongitude =
    typeof longitude === "number" && !isNaN(longitude) ? longitude : 0;

  const onPolygonComplete = React.useCallback(
    function onPolygonComplete(poly) {
      const polyArray = poly.getPath().getArray();
      let paths = [];
      polyArray.forEach(function (path) {
        paths.push({ lat: path.lat(), lng: path.lng() });
      });
      setPath(paths);
      point(paths);
      poly.setMap(null);
    },
    [point]
  );

  //define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenerRef = useRef([]);

  //call setpath with new edited paths
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latlng) => {
          return { lat: latlng.lat(), lng: latlng.lng() };
        });
      setPath(nextPath);
      point(nextPath);
    }
  }, [setPath, point]);

  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenerRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const onUnmount = useCallback(() => {
    listenerRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={apiKey}
        libraries={libraries}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={{ lat: validLatitude, lng: validLongitude }} // Set center as an object with lat and lng keys
          zoom={20}
        >
          {path.length === 0 || path.length === 1 || path.length === 2 ? (
            <DrawingManager
              drawingMode={state.drawingMode}
              options={options}
              editable
              draggable
              onPolygonComplete={onPolygonComplete}
              onMouseUp={onEdit}
              onDragEnd={onEdit}
            />
          ) : (
            <Polygon
              options={{
                fillColor: "#2196F3",
                strokeColor: "#2196F3",
                fillOpacity: 0.5,
                strokeWeight: 2,
              }}
              editable
              path={path}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onMouseUp={onEdit}
              onDragEnd={onEdit}
            />
          )}
          <Marker position={{ lat: validLatitude, lng: validLongitude }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GeoMaps;
