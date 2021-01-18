import React, { useState } from "react";
import facade from "../utils/apiFacade.js";
import TableOfSports from "./SportTableUser.js";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import SportTableUser from "./SportTableUser.js";
import SportTableAdmin from "./SportTableAdmin.js";
import { Switch, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true), setError(""))
      .catch((err) => {
        setError("Wrong username or password");
      });
  };

  return (
    <div>
      <Header />
      <Switch>
        {!loggedIn ? (
          <div>
            <Route exact path="/">
              <LogIn login={login} />
              <p>{error}</p>
              <h3>Hejsa, Velkommen:</h3>
              <p>
                Dette er velkomstsiden til 3 semester programmeringseksamen.
                <br />
                Log ind som user/testuser eller admin/testadmin.
                <br />
                Som user og admin kan man tilgå begge brugerheadere.
                <br />
                <br />
                <br />
                <br />
              </p>
            </Route>
            <Route path="/usersport">
              <SportTableUser />
            </Route>
          </div>
        ) : (
          <div>
            <div>
              <Route exact path="/">
                <LoggedIn />
                <button onClick={logout}>Logout</button>
              </Route>
            </div>
            <div></div>
            <div>
              <Route path="/adminsport">
                {facade.getRole() === "admin" ? (
                  <SportTableAdmin />
                ) : (
                  <p>Du er ikke logget ind som admin</p>
                )}
              </Route>
            </div>
          </div>
        )}
      </Switch>
    </div>
  );
}
export default App;
