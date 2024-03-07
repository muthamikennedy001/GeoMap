import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Map1 from "./Map1";

function Home() {
  const [allMaps, setAllMaps] = useState([]);
  const history = useHistory();
  const [name, setName] = useState();
  let message = "";

  const addName = () => {
    axios
      .post("http://localhost:2000/api/addName", { name: name })
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
      .get("http://localhost:2000/api/getAllMaps")
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
        placeholder="Search..."
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
      <h3>Map List</h3>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>TD</th>
              <th>PLACES</th>
              <th>ACTIONS</th>
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
        </Table>
      </div>
    </div>
  );
}

export default Home;
