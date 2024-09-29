import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed, please check your credentials');
            }

            const data = await response.json();

            if (data.message === 'Login successful') {
                sessionStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                setError('Login failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-lightGray px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-mediumGray">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-mediumGray rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-mediumGray">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-mediumGray rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="bg-secondary text-white py-2 px-4 rounded w-full hover:bg-secondary-dark transition" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;