import React, { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { useNavigate } from 'react-router-dom';
import CompSidebar from './CompSidebar';
import CompTopbar from './CompTopbar';

const Document = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const [documentPath, setDocumentPath] = useState('');
    const [submitError, setSubmitError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]); 

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                if (!user || !user.jobs) {
                    throw new Error('User not logged in or no jobs found');
                }

                const jobs = user.jobs.map(job => job.id);
                const response = await fetch(`${API_URL}/documents`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ jobs }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }

                const data = await response.json();
                setDocuments(data.documents || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_URL}/jobs`); // Endpoint to fetch all jobs
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                setAllJobs(data.jobs || []); // Store all jobs in state
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDocuments();
        fetchJobs();
    }, []);

    const fetchDocuments = async () => {
        if (!user || !user.jobs) return;
    
        try {
            const jobs = user.jobs.map(job => job.id);
            const response = await fetch(`${API_URL}/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobs }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch documents');
            }
    
            const data = await response.json();
            setDocuments(data.documents || []);
        } catch (err) {
            setSubmitError(err.message);
        }
    };

    const handleJobSelection = (e) => {
        const { options } = e.target;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedJobs(selected);
        console.log(selectedJobs);
    };

    const handleDocumentSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        try {
            const status = user.level == 99 ? 0 : 1;
            const response = await fetch(`${API_URL}/document/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document_name: documentName,
                    document_path: documentPath,
                    status: status,
                    jobs: selectedJobs,
                    user_id: user.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit document');
            }

            // window.location.reload();
            await fetchDocuments();

            // Clear form fields
            setDocumentName('');
            setDocumentPath('');
            setIsFormOpen(false);
        } catch (err) {
            setSubmitError(err.message);
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

                <div className="p-6 lg:p-8">
                    <h1 className="text-3xl font-bold text-primary mb-4">Dokumen <i>Guide</i></h1>

                    {/* Collapsible Document Submission Form */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setIsFormOpen(!isFormOpen)}
                        >
                            <h5 className="text-md font-semibold">Ajukan dokumen baru</h5>
                            <span className="text-xl font-bold">
                                {isFormOpen ? '-' : '+'}
                            </span>
                        </div>
                        {isFormOpen && (
                            <div className="mt-4">
                                {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
                                <form onSubmit={handleDocumentSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-mediumGray">Judul Dokumen</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-mediumGray rounded"
                                            value={documentName}
                                            onChange={(e) => setDocumentName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-mediumGray">Tautan Dokumen</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-mediumGray rounded"
                                            value={documentPath}
                                            onChange={(e) => setDocumentPath(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-mediumGray">IKI Terkait</label>
                                        <select
                                            multiple
                                            value={selectedJobs}
                                            onChange={handleJobSelection}
                                            className="w-full p-2 border border-mediumGray rounded"
                                            required
                                        >
                                            {user.level !== 99 ? (
                                                allJobs.map((job) => ( // Use all jobs if user level is not 99
                                                    <option key={job.id} value={job.id}>
                                                        {job.title}
                                                    </option>
                                                ))
                                            ) : (
                                                user.jobs.map((job) => ( // Use user's jobs if user level is 99
                                                    <option key={job.id} value={job.id}>
                                                        {job.title}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                    <button className="bg-secondary text-white py-2 px-4 rounded" type="submit">
                                        Ajukan!
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Display Documents */}
                    {documents.filter(document => document.status == 1).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {documents
                            .filter(document => document.status == 1)
                            .map((document, index) => (
                                <div key={`${document.id}-${index}`} className="p-4 bg-white rounded shadow">
                                    <h3 className="text-xl font-semibold text-primary">{document.name}</h3>
                                    <p className="text-mediumGray mt-2">{document.job}</p>
                                    <a
                                        href={document.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block text-secondary hover:underline"
                                    >
                                        View Document
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No documents found for your jobs.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Document;