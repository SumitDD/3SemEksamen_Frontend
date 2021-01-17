import React from "react";
import { NavLink, Route, useParams, useRouteMatch } from "react-router-dom";

function Header(props) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/usersport">
            UserSport
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/adminsport">
            AdminSport
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
