import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
const User = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    navigate("/login");
  };

  const handleloginBtn = () => {
    navigate("/login");
  };

  return (
    <div className="main">
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <input
          className="input-box"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          className="input-box"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input-box"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p
          onClick={handleloginBtn}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Sign in
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {user && <p>User created successfully!</p>}
      </form>
    </div>
  );
};

export default User;
