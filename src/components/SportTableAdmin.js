import "bootstrap/dist/css/bootstrap.min.css";
import facade from "../utils/apiFacade.js";
import React, { useState, useEffect } from "react";

function TableOfSports() {
  let allSports = [
    {
      name: "",
      description: "",
    },
  ];

  let newSport = {
    name: "",
    description: "",
  };

  const [dataFromServerObj, setDataFromServerObj] = useState(allSports);
  const [newDataFromServerObj, setNewDataFromServerObj] = useState(newSport);
  const [reloadTable, setReloadTable] = useState(false);

  const onChangeNewUser = (evt) => {
    evt.preventDefault();
    setNewDataFromServerObj({
      ...newDataFromServerObj,
      [evt.target.id]: evt.target.value,
    });
  };

  const createNewSport = (evt) => {
    evt.preventDefault();
    facade.addNewSport(newDataFromServerObj);
  };

  const sportItems = dataFromServerObj.map((sport) => (
    <tr key={sport.name}>
      <th scope="row"></th>
      <td>{sport.name}</td>
      <td>{sport.description}</td>
      <button onClick={createNewSport}>Delete</button>
    </tr>
  ));

  useEffect(() => {
    facade.fetchAllSports().then((data) => setDataFromServerObj(data));
    setReloadTable(false);
  }, [reloadTable]);

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody> {sportItems}</tbody>
      </table>

      <div className="col-3">
        <h2>Add new Sport</h2>
        <form onChange={onChangeNewUser}>
          <input placeholder="Name" id="name" />
          <input placeholder="Description" id="description" />
          <button onClick={createNewSport}>Click</button>
        </form>
      </div>
    </div>
  );
}

export default TableOfSports;
