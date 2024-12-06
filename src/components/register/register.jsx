import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/admin/register', {
        firstName,
        middleName,
        lastName,
        email,
        contactNo,
        password
      });

      if (response.data.message === "User created") {
        const loginResponse = await axios.post('/admin/login', {
          email,
          password
        });

        if (loginResponse.data.access_token) {
          login(loginResponse.data.user, loginResponse.data.access_token);
          navigate("/dashboard");
        } else {
          setError('Registration successful, but login failed.');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        {error && <div className="error-message">{error}</div>}
        
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="Middle Name" 
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="tel" 
          placeholder="Contact Number" 
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
        />
        
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <div className="show-password">
          <input 
            type="checkbox" 
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show Password</label>
        </div>
        
        <button onClick={handleRegister}>REGISTER</button>
        
        <div className="login-link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
};

export default Register;
