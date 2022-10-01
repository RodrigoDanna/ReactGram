
import React from "react";
import "./Navbar.css";

// Components
import {NavLink, Link} from 'react-router-dom';
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill
} from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form action="">
        <BsSearch />
        <input type="text" />
      </form>
      <NavLink to="/">
        <BsHouseDoorFill />
      </NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  )
}

export default Navbar