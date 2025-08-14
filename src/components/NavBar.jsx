import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";

const NavBar = () => {
  const { user } = useContext(Context);
  return (
    <div style={{ display: "flex", width: "auto", padding: "2rem" }}>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}
      <p style={{ marginLeft: "auto" }} hidden={!user?.name}>
        Hello {user?.name}
      </p>
    </div>
  );
};

export default NavBar;
