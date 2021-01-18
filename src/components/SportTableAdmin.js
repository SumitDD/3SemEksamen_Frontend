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

  let newSportTeam = {
    pricePerYear: "",
    teamName: "",
    minAge: "",
    maxAge: "",
    sport: "",
  };
  let allSportTeams = [
    {
      pricePerYear: "",
      teamName: "",
      minAge: "",
      maxAge: "",
      sport: "",
    },
  ];

  const [dataFromServerObj, setDataFromServerObj] = useState(allSports);
  const [newDataFromServerObj, setNewDataFromServerObj] = useState(newSport);
  const [newSportTeamFromSever, setNewSportTeamFromServer] = useState(
    newSportTeam
  );
  const [sportDataFromServerObj, setSportDataFromServerObj] = useState(
    allSportTeams
  );

  useEffect(() => {
    facade.fetchAllSports().then((data) => setDataFromServerObj(data));
  }, [dataFromServerObj]);

  useEffect(() => {
    facade.fetchAllSportTeams().then((data) => setSportDataFromServerObj(data));
  }, [sportDataFromServerObj]);

  const onChangeNewSport = (evt) => {
    evt.preventDefault();
    setNewDataFromServerObj({
      ...newDataFromServerObj,
      [evt.target.id]: evt.target.value,
    });
  };

  const deleteSportTeam = (evt) => {
    evt.preventDefault();
    let teamName = evt.target.id;

    facade.deleteSportTeam(teamName);
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

  const sportItems = dataFromServerObj.map((sport) => (
    <tr key={sport.name}>
      <td>{sport.name}</td>
      <td>{sport.description}</td>
    </tr>
  ));
  const sportTeamItems = sportDataFromServerObj.map((sportteam) => (
    <tr key={sportteam.teamName}>
      <td>{sportteam.teamName}</td>
      <td>{sportteam.pricePerYear}</td>
      <td>{sportteam.minAge}</td>
      <td>{sportteam.maxAge}</td>
      <td>{sportteam.sport}</td>
      <button id={sportteam.teamName} onClick={deleteSportTeam}>
        Delete
      </button>
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

      <div className="col-3">
        <h2>Add new Sport</h2>
        <form onChange={onChangeNewSport}>
          <input placeholder="Name" id="name" />
          <input placeholder="Description" id="description" />
          <button onClick={createNewSport}>Click</button>
        </form>
      </div>
      <br></br>
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
      <br></br>
      <table class="table">
        <thead>
          <h3>ALL SPORTSTEAMS</h3>
          <tr>
            <th scope="col">Teamname</th>
            <th scope="col">PricePerYear</th>
            <th scope="col">MinAge</th>
            <th scope="col">MaxAge</th>
            <th scope="col">Sport</th>
          </tr>
        </thead>
        <tbody>{sportTeamItems}</tbody>
      </table>
    </div>
  );
}

export default TableOfSports;
