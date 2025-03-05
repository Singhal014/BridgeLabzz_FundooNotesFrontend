import React, { useState } from "react";
import { Container, Grid, Box, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../../utils/Api";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await loginApiCall({ email, password });

      console.log("API Response:", response.data); 

      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        navigate("/dashboard");
      } else {
        setPasswordError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        setPasswordError("Invalid email or password.");
      } else {
        setPasswordError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Container className="login-container">
      <Box className="login-box">
        <Typography className="title">Fundo</Typography>
        <Typography className="subtitle">Sign in</Typography>
        <Typography className="subtext">Use your Fundo Account</Typography>

        <TextField
          fullWidth
          label="Email or phone"
          className="input-field"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          className="input-field"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

        <Grid container justifyContent="flex-start">
          <Link href="#" className="forgot-password">
            Forgot password
          </Link>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" mt={2}>
          <Link onClick={() => navigate("/signup")} className="create-account" style={{ cursor: "pointer" }}>
            Create account
          </Link>
          <Button className="login-button" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
