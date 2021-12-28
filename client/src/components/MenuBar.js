import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleClick = (e, { name }) => setActiveItem(name);

  const menubar = user ? (
    <div>
      <Menu pointing secondary size="large" color="purple">
        <Menu.Item name={user.username} active as={Link} to="/" />

        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="large" color="purple">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            onClick={handleClick}
            as={Link}
            to="/register"
            active={activeItem === "register"}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return menubar;
};

export default MenuBar;
