import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const MenuBar = () => {
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleClick = (e, { name }) => setActiveItem(name);

  return (
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
      <div class="ui segment">
        <p></p>
      </div>
    </div>
  );
};

export default MenuBar;
