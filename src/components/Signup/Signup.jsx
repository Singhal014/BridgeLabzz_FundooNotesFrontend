import React, { useState } from "react";
import { Container, Grid, Box, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { signApiCall } from "../../utils/Api";
import "./Signup.scss";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSignup = async () => {
    setError("");
  
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }
  
    try {
      const response = await signApiCall({ firstName, lastName, email, password });
  
      if (response.data && response.data.token) {
        localStorage.setItem("accessToken", response.data.token); // Store only accessToken
  
        console.log("Signup successful, redirecting...");
  
        navigate("/dashboard");
      } else {
        setError("Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup Failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <Container className="signup-container">
      <Box className="signup-box">
        <Box className="signup-form">
          <Typography className="title">Fundo</Typography>
          <Typography className="subtitle">Create your Fundo Account</Typography>

          {error && <Typography className="error-message">{error}</Typography>}

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="First Name" className="input-field" onChange={(e) => setFirstName(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Last Name" className="input-field" onChange={(e) => setLastName(e.target.value)} />
            </Grid>
          </Grid>

          <TextField fullWidth label="Email" type="email" className="input-field" onChange={(e) => setEmail(e.target.value)} margin="normal" />
          <TextField fullWidth label="Password" type="password" className="input-field" onChange={(e) => setPassword(e.target.value)} margin="normal" />

          <Grid container justifyContent="space-between" alignItems="center" mt={2}>
            <Link onClick={() => navigate("/")} className="signin-instead" style={{ cursor: "pointer" }}>
              Sign in instead
            </Link>
            <Button className="signup-button" onClick={handleSignup}>
              Register
            </Button>
          </Grid>
        </Box>

        <Box className="signup-image">
          <img src="/assets/Create.jpg" alt="Signup" />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
