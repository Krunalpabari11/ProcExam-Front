'use client'
import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';  // Import the jwt-decode library
import { start } from 'repl';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizId, setQuizId] = useState('');
    const [videoFeedSrc, setVideoFeedSrc] = useState('start');
    const [status, setStatus] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isVerified, setIsVerified] = useState(false);  // Track face verification status
    const [currentUser, setCurrentUser] = useState<string>('');
    const [presentUser, setPresentUser] = useState<string>('');
    const [authorized,setAuthorized]=useState(false)
    const router=useRouter();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
            const role = jwtDecode(token);
            if (role.role === 'company') {
                router.push('/company');
            }
            setAuthorized(true)
        }
        else{
            router.push('/')
        }
        
    },[])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentUser(token);
        }
    }, []);

    // Decode the JWT token to get the user's email
    useEffect(() => {
        if (currentUser) {
            const decodedToken = jwtDecode(currentUser);
            setPresentUser(decodedToken.email);
        }
    }, [currentUser]);

    // Initialize WebSocket connection when presentUser is available
    const startRecognition=() => {
        if (presentUser) {
            const newSocket = new WebSocket('ws://localhost:8767');
            
            newSocket.onopen = () => {
                console.log('WebSocket connection opened');
                newSocket.send(JSON.stringify({ command: 'recognize',username: 'krunal' }));
            };

            newSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.image) {
                    setVideoFeedSrc(`data:image/jpeg;base64,${data.image}`);
                } else if (data.match !== undefined) {
                    if (data.match) {
                        setStatus(`Match found for ${data.name}!`);
                        setIsVerified(true);  // Set isVerified to true when a match is found
                    } else {
                        setStatus(`No match found for quiz ID ${quizId}.`);
                        setIsVerified(false);  // Ensure isVerified is false if no match is found
                    }
                } else if (data.error) {
                    setStatus(`Error: ${data.error}`);
                }
            };

            newSocket.onclose = () => {
                console.log('WebSocket connection closed');
                setStatus('WebSocket connection closed');
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                setStatus('WebSocket error occurred');
            };

            // Store the WebSocket in state to manage it
            setSocket(newSocket);

            return () => {
                // Cleanup WebSocket when component unmounts
                if (newSocket) newSocket.close();
            };
        }
    };


    const handleProceed = () => {
        if (!isVerified) {
            alert('Face verification failed. Please try again.');
            return;
        }

        if(!quizId) {
            alert('Please enter a valid Quiz ID.');
            return;
        }
        console.log("Quiz ID:", quizId);
        router.push('/student/exam?quizId='+ quizId);
        closeModal();


    };

    const openModal = () => {setIsModalOpen(true); startRecognition();};
    const closeModal = () => setIsModalOpen(false);

    return (
      authorized &&   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Click On The Button To Start The Assessment</h1>
            <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
                Start Assessment
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Enter Quiz ID</h2>
                        <input
                            type="text"
                            placeholder="Quiz ID"
                            value={quizId}
                            onChange={(e) => setQuizId(e.target.value)}
                            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:border-blue-500"
                        />

            {videoFeedSrc && (
                    <div className="mt-8">
                    <img src={videoFeedSrc} alt="Video Feed" className="max-w-full h-auto rounded-lg" />
                </div>
            )}
                        {/* Video Feed Display */}
            
            {/* Recognition Status */}
            <div className="mt-4 text-center">
                <p className="text-lg">{status}</p>
            </div>

                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProceed}
                                className={`px-4 py-2 ${isVerified ? 'bg-blue-500' : 'bg-gray-400'} text-white rounded hover:${isVerified ? 'bg-blue-600' : 'bg-gray-400'} focus:outline-none`}
                                disabled={!isVerified}  // Disable the button if not verified
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
