import React from "react";
import { NavLink } from "react-router-dom";

const CompSidebar = ({user}) => {
    return (
        <div className="w-full lg:w-64 bg-white shadow-md lg:shadow-lg">
            <div className="p-4">
                <h1 className="text-xl font-bold">Kemenkeu Guide</h1>
            </div>
            <nav className="mt-6">
                <ul>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => 
                                isActive ? "text-primary font-semibold" : "text-gray-600"}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                        <NavLink 
                            to="/document" 
                            end
                            className={({ isActive }) => 
                                isActive ? "text-primary font-semibold" : "text-gray-600"}
                        >
                            Documents
                        </NavLink>
                    </li>
                    {user.level !== 99 && (
                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                            <NavLink 
                                to="/document/req" 
                                className={({ isActive }) => 
                                    isActive ? "text-primary font-semibold" : "text-gray-600"}
                            >
                                Document Requests
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default CompSidebar;
