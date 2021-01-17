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

  const [dataFromServerObj, setDataFromServerObj] = useState(allSports);

  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    setDataFromServerObj(allSports);
  }, []);

  const getAllSports = (evt) => {
    evt.preventDefault();
    facade.fetchAllSports().then((data) => setDataFromServerObj(data));
  };

  const sportItems = dataFromServerObj.map((sport) => (
    <tr key={sport.name}>
      <th scope="row"></th>
      <td>{sport.name}</td>
      <td>{sport.description}</td>
    </tr>
  ));

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody> {sportItems}</tbody>
      </table>

      <div className="row mt-5">
        <div className="col-3">
          <h2>Get all sports</h2>
          <button onClick={getAllSports}>Click</button>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default TableOfSports;
