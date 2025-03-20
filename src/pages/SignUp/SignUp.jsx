import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.scss';
import { signApiCall } from '../../services/api';
import SignLogo from "../../assets/images.jpeg"; 


export const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError('');

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await signApiCall({ firstName, lastName, email, password });

            if (response.data && response.data.token) {
                localStorage.setItem('accessToken', response.data.token);

                console.log('Signup successful, redirecting...');
                navigate('/dashboard');
            } else {
                setError('Signup failed. Try again.');
            }
        } catch (error) {
            console.error('Signup Failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className='SignUp-container'>
            <div className='SignUp-box'>
                <div className='SignUp-content'>
                    <Typography className='SignUp-title'>Fundo</Typography>
                    <Typography className='SignUp-subtitle'>Create your Fundo Account</Typography>

                    {error && <Typography className="error-message">{error}</Typography>}

                    <div className="input-row">
                        <TextField
                            label="First Name*"
                            variant="outlined"
                            className="SignUp-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="Last Name*"
                            variant="outlined"
                            className="SignUp-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <TextField
                        label="Email*"
                        variant="outlined"
                        fullWidth
                        className="SignUp-input"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Password*"
                        type="password"
                        variant="outlined"
                        fullWidth
                        className="SignUp-input"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        label="Confirm Password*"
                        type="password"
                        variant="outlined"
                        fullWidth
                        className="SignUp-input"
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className="actions">
                        <Link to="/" className="Sign-link">Sign in instead</Link>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSignup}
                        >
                            Register
                        </Button>
                    </div>
                </div>

                <div className='SignUp-image'>
                <img src={SignLogo} alt="Sign Logo" className="logo" />

                    <div className='img-footer'>
                        <p>
                            One account. <br />
                            All of Fundo working for you
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
