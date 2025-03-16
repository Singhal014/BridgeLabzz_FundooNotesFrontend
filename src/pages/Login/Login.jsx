import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { loginApiCall } from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleLogin = async () => {
        setError('');

        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await loginApiCall({ email, password });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);

                navigate('/dashboard');
            } else {
                setError('Invalid email or password.');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Invalid email or password.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h3 className="login-title">Fundoo</h3>
                <h4 className="login-subtitle">Sign in</h4>
                <p className="login-text">Use your Fundoo Account</p>

                <input
                    type="text"
                    placeholder="Email or phone"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-text">{error}</p>}

                <div className="actions">
                    <a href="" className="forgot-link">Forgot password</a>
                    <Button
                        variant="contained"
                        color="primary"
                        className="login-button"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>

                <Link to="/Signup" className="create-account">Create account</Link>
            </div>

            <div className='login-footer'>
                <p>English (United States)</p>
                <p>Help</p>
                <p>Privacy</p>
                <p>Terms</p>
            </div>
        </div>
    );
};

export default Login;
