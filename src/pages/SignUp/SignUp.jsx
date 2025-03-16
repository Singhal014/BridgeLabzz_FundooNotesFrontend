import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.scss';
import { signApiCall } from '../../services/api';

export const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError('');

        if (!firstName || !lastName || !email || !password) {
            setError('All fields are required');
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <img
                        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcReaCm5ivh8Pe-MeVsBJxTxnS6B3LXV6tCKSeDGPuMG-G1cUb3C"
                        alt="Image error"
                    />
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