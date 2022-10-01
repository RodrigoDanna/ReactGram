import React, { useState, useEffect } from "react";
import "./Auth.css";

// Components
import { Link } from 'react-router-dom';

const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div id="register">
      <h2>ReactGram</h2>

      <p className="subtitle">Register now and be part of ReactGram</p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <input type="submit" value="Register" />
      </form>

      <p>Already have an account? <Link to="/login">Click here.</Link></p>
    </div>
  )
}

export default Register