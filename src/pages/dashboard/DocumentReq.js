import React, { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { FaFileAlt } from 'react-icons/fa';
import CompSidebar from './CompSidebar';
import CompTopbar from './CompTopbar';

const DocumentReq = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (user.level === 99) {
                setError("Access denied: Insufficient permissions.");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/documents`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }

                const data = await response.json();
                setDocuments(data.documents || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch(`${API_URL}/documents`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch documents');
            }

            const data = await response.json();
            setDocuments(data.documents || []);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStatusUpdate = async (documentId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/document/update/${documentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update document status');
            }

            // Update the local state to reflect the status change
            fetchDocuments()
        } catch (err) {
            console.error(err);
            // You can also set an error state here if needed
        }
    };

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            <CompSidebar user={user} />
            <div className="flex-1 flex flex-col">
                <CompTopbar />
                <div className="p-4">
                    <h2 className="text-3xl font-bold text-primary mb-4">Persetujuan Dokumen <i>Guide</i></h2>
                    {documents.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b">Judul</th>
                                    <th className="py-2 px-4 border-b">Tautan</th>
                                    <th className="py-2 px-4 border-b">IKI</th>
                                    <th className="py-2 px-4 border-b">Status</th>
                                    <th className="py-2 px-4 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((document, index) => (
                                    <tr key={`${document.id}-${index}`}>
                                        <td className="py-2 px-4 border-b">{document.name}</td>
                                        <td className="py-2 px-4 border-b">
                                        <a 
                                            href={document.path} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-mediumGray hover:text-black flex items-center"
                                        >
                                            <FaFileAlt className="mr-2" /> 
                                            Lihat
                                        </a>
                                        </td>
                                        <td className="py-2 px-4 border-b">{document.job}</td>
                                        <td className="py-2 px-4 border-b">{document.status === 1 ? 'Approved' : 'Pending'}</td>
                                        <td className="py-2 px-4 border-b">
                                            {document.status === 0 && (
                                                <button
                                                    onClick={() => handleStatusUpdate(document.id, 1)} // Approve the document
                                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                                >
                                                    Setujui
                                                </button>
                                            )}
                                            {document.status === 1 && (
                                                <button
                                                    onClick={() => handleStatusUpdate(document.id, 0)} // Disapprove the document
                                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                                >
                                                    Tangguhkan
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No documents available for approval.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentReq;