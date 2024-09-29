import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Document from './pages/dashboard/Document';
import DocumentReq from './pages/dashboard/DocumentReq';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                  <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/document" element={<Document />} />
                    <Route path="/document/req" element={<DocumentReq />} />
                    {/* Add other routes here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;