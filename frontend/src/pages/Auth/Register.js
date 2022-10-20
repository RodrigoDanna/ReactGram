// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./Auth.css";

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message';

//Redux
import { register, reset } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    };

    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  return (
    <div id="register">
      <h2>ReactGram</h2>

      <p className="subtitle">Register now and be part of ReactGram</p>

      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        {!loading && <input type="submit" value="Register" />}
        {loading && <input type="submit" value="Please, wait..." disabled/>}
        {error && <Message msg={error} type="error"/>}
      </form>

      <p>Already have an account? <Link to="/login">Click here.</Link></p>
    </div>
  )
}

export default Register