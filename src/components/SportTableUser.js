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
  const [sportDataFromServerObj, setSportDataFromServerObj] = useState(
    allSportTeams
  );

  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    facade.fetchAllSports().then((data) => setDataFromServerObj(data));
    facade.fetchAllSportTeams().then((data) => setSportDataFromServerObj(data));
  }, []);

  const sportTeamItems = sportDataFromServerObj.map((sportteam) => (
    <tr key={sportteam.teamName}>
      <td>{sportteam.teamName}</td>
      <td>{sportteam.pricePerYear}</td>
      <td>{sportteam.minAge}</td>
      <td>{sportteam.maxAge}</td>
      <td>{sportteam.sport}</td>
    </tr>
  ));

  const sportItems = dataFromServerObj.map((sport) => (
    <tr key={sport.name}>
      <td>{sport.name}</td>
      <td>{sport.description}</td>
    </tr>
  ));
  console.log(sportDataFromServerObj);

  return (
    <div>
      <table class="table">
        <thead>
          <h3>ALL SPORTS</h3>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody> {sportItems}</tbody>
      </table>

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
