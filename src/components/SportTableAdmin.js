import "bootstrap/dist/css/bootstrap.min.css";
import facade from "../utils/apiFacade.js";
import React, { useState, useEffect } from "react";
import SportTeamTable from "./SportTeamAdmin.js";

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

  let newSportTeam = {
    pricePerYear: "",
    teamName: "",
    minAge: "",
    maxAge: "",
    sport: "",
  };

  const [dataFromServerObj, setDataFromServerObj] = useState(allSports);
  const [newDataFromServerObj, setNewDataFromServerObj] = useState(newSport);
  const [newSportTeamFromSever, setNewSportTeamFromServer] = useState(
    newSportTeam
  );
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
  const onChangeNewSportTeam = (evt) => {
    evt.preventDefault();
    setNewSportTeamFromServer({
      ...newSportTeamFromSever,
      [evt.target.id]: evt.target.value,
    });
  };

  const addNewSportTeam = (evt) => {
    evt.preventDefault();
    facade.addNewSportTeam(newSportTeamFromSever);
  };
  console.log(newSportTeamFromSever);
  const sportItems = dataFromServerObj.map((sport) => (
    <tr key={sport.name}>
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

      <div className="col-3">
        <h2>Add new Sportteam</h2>
        <form onChange={onChangeNewSportTeam}>
          <input placeholder="PricePerYear" id="pricePerYear" />
          <input placeholder="TeamName" id="teamName" />
          <input placeholder="MinAge" id="minAge" />
          <input placeholder="MaxAge" id="maxAge" />
          <input placeholder="Sport" id="sport" />
          <button onClick={addNewSportTeam}>Click</button>
        </form>
      </div>
    </div>
  );
}

export default TableOfSports;
