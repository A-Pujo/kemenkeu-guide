import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Icon for the user

const CompTopbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user'); // Clear session storage
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="p-4 flex justify-between items-center">
            <div></div>
            <div className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    <FaUserCircle className="text-3xl text-primary" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                        <div className="p-4 border-b">
                            <span className="text-sm text-gray-600">Logged in as</span>
                            <p className="font-semibold text-gray-900">
                                {JSON.parse(sessionStorage.getItem('user')).name}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompTopbar;
