import React, { useState } from 'react';
import CompSidebar from './CompSidebar';
import CompTopbar from './CompTopbar'; // Importing the CompTopbar component

const Dashboard = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            <CompSidebar user={user} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* CompTopbar */}
                <CompTopbar />

                <div className="flex-1 p-6 lg:p-8">
                    <h2 className="text-2xl font-semibold">Halo, {user.name}!</h2>

                    {/* User Jobs Section */}
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Indikator Kinerja Individu:</h3>
                        {user?.jobs && user.jobs.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                                {user.jobs.map((job) => (
                                    <li 
                                        key={job.id} 
                                        className="bg-white shadow-md rounded p-4 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <h4 className="font-bold">{job.title}</h4>
                                        <p className="text-gray-600">{job.description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">You have no jobs assigned.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;