import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ViewMap from "./ViewMap";
import EditMap from "./EditMap";
import { useHistory } from "react-router-dom";

function Map1({ id, name, map }) {
  const history = useHistory();
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const openViewModal = () => {
    setModalView(true);
  };

  const openEditModal = () => {
    setModalEdit(true);
  };

  const closeModal = () => {
    setModalEdit(false);
  };

  // const [allGeoMaps, setAllGeoMaps] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [allMaps, setAllMaps] = useState([]);

  const getAllCoordinateMaps = () => {
    axios
      .get("http://localhost:2000/api/getAllCoordinateMaps")
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
      if (!unmounted) return getAllCoordinateMaps();
    }, 50);
    return () => {
      unmounted = true;
    };
  }, []);
  // const getAllMaps = () => {
  //   axios
  //     .get("http://localhost:2000/api/getAllMaps")
  //     .then((response) => {
  //       if (response) {
  //         setAllGeoMaps(response.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   let unmounted = false;
  //   setTimeout(() => {
  //     if (!unmounted) return getAllCoordinateMaps();
  //   }, 50);
  //   return () => {
  //     unmounted = true;
  //   };
  // }, []);

  useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      if (!unmounted) {
        axios
          .post("http://localhost:2000/api/allGeoMapInfo", { parentId: map.id })
          .then((response) => {
            if (
              response.data.result.length > 0 &&
              response.data.result[0].coordinates
            ) {
              setCoordinates(JSON.parse(response.data.result[0].coordinates));
            }
          });
      }
    }, 51);
    return () => {
      unmounted = true;
    };
  }, [map.id]);

  let points = [];

  if (coordinates !== undefined) {
    for (let i = 0; i < coordinates.length; i++) {
      points.push(coordinates[i]);
    }
  }

  const [state, setState] = useState(points);

  const deleteMap = (id) => {
    if (window.confirm("Are You Sure You Want to delete")) {
      axios
        .delete(`http://localhost:2000/api/deleteMap/${id}`)
        .then((response) => {
          alert("Successfully deleted coords");
          getAllCoordinateMaps();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("cancelled");
    }
  };

  let checkMap;
  var newArray = allMaps.map((item) => {
    if (item.parentId === map.id) {
      checkMap = map.id;
    }
  });

  const addMap = (name) => {
    history.push(`/map/${name}`);
  };

  const deleteMapName = (id) => {
    if (window.confirm("Are You Sure You Want to delete")) {
      axios
        .delete(`http://localhost:2000/api/deleteMapName/${id}`)
        .then((response) => {
          alert("Successfully deleted map");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("cancelled");
    }
  };

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          {checkMap && checkMap !== undefined ? (
            <>
              <button onClick={openViewModal}>View</button>
              <button onClick={openEditModal}>Edit</button>
              <button onClick={() => deleteMap(map.id)}>Remove</button>
            </>
          ) : (
            <>
              <button onClick={() => addMap(map.name)}>Add New</button>
              <button onClick={() => deleteMapName(map.id)}>Delete</button>
            </>
          )}
        </td>
      </tr>
      <Modal isOpen={modalView} ariaHideApp={false} contentLabel="View Map">
        <ViewMap points={points} setModalView={setModalView} />
      </Modal>
      <Modal isOpen={modalEdit} ariaHideApp={false} contentLabel="Edit Map">
        <EditMap
          apiKey={process.env.REACT_APP_GOOGLEAPI}
          paths={points}
          point={state}
          center={points[0]}
          setPoint={setState}
          close={closeModal}
          id={id}
          // color={color}
          // setColor={setColor}
        />
      </Modal>
    </>
  );
}

export default Map1;
