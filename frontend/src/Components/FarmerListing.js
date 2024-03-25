import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Map1 from "./Map1";

function FarmerListing(props) {
  const idno = props.idno;
  console.log("farmers specific details idno", idno);
  const [allMaps, setAllMaps] = useState([]);
  const history = useHistory();
  const [name, setName] = useState();
  let message = "";

  const addName = () => {
    axios
      .post("http://localhost:2000/api/addName", { name: name, idno: idno })
      .then((response) => {
        if (response) {
          message = response.data.msg;
          alert(message);
          history.push(`/map/${name}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          alert("Place already exists"); // Display error message for duplicate entry
        } else {
          console.error("Error adding place:", error);
          // Handle other error cases if needed
        }
      });
  };

  const getAllMaps = () => {
    axios
      .get(`http://localhost:2000/api/getAllFarmersMaps/${idno}`)
      .then((response) => {
        if (response) {
          setAllMaps(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      getAllMaps();
    }, 1000);
    return () => (unmounted = true);
  }, []);
  console.log(allMaps);

  return (
    <div>
      <div style={{ marginTop: "10px" }}></div> <br />
      <input
        type="text"
        placeholder="Add Farmers Location"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="searchtext"
      />
      &nbsp;
      <Button
        variant="dark"
        className="searchbtn"
        disabled={name == "" ? true : false}
        onClick={addName}
      >
        Add
      </Button>
      <br />
      <div class=" mt-4 bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <h3 class="text-xl leading-none font-bold text-gray-900 mb-10">
          Farm Listing for Farmer Id No: {idno}
        </h3>
        <div class="block w-full overflow-x-auto">
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Id
                </th>
                <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-middle uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Name
                </th>
                <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-middle uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allMaps.map((map, index) => (
                <Map1
                  key={map.id}
                  id={map.id}
                  name={map.name}
                  index={index}
                  map={map}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FarmerListing;
