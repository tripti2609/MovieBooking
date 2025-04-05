// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      const { accessToken, uuid, userId } = res.data;

      // Store token in sessionStorage
      sessionStorage.setItem('access-token', accessToken);
      sessionStorage.setItem('uuid', uuid);
      sessionStorage.setItem('userId', userId);

      alert("Login successful!");
      onLoginSuccess(); // Optional: for redirect or reload
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
