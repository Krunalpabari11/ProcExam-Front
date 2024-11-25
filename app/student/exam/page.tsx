'use client'
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import api from "../../lib/api";
import {jwtDecode} from 'jwt-decode';
import { data } from "autoprefixer";

export default function Exam() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const quizId = searchParams.get('quizId');
    
    const [questions, setQuestions] = useState<{ _id: string, question_text: string, options: string[] }[]>([]);
    const [answers, setAnswers] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [warningCount, setWarningCount] = useState(0);
    const [socket, setSocket] = useState(null);
    const [authorized,setAuthorized]=useState(false)
    const [faceFeedData, setFaceFeedData] = useState({
        status: 'Connecting...',
        faces: [],
        warningCount: 0,
        image: ''
    });

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

    // WebSocket connection setup
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8765');
        
        ws.onopen = () => {
            setFaceFeedData(prev => ({
                ...prev,
                status: 'Connected to proctoring system'
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setFaceFeedData(data);

            // Check for warnings
             setWarningCount(data.warningCount);   
        };

        ws.onclose = (event) => {
            if (event.wasClean) {
                setFaceFeedData(prev => ({
                    ...prev,
                    status: `Disconnected: ${event.reason}`
                }));
            } else {
                setFaceFeedData(prev => ({
                    ...prev,
                    status: 'Connection lost'
                }));
            }
        };

        setSocket(ws);

        return () => {
            if (ws) ws.close();
        };
    }, []);


    useEffect(()=>{

        if(warningCount<3)
        {
            setModalContent({
                title: 'Warning',
                message: `Either Multiple Face or No face detected. Warning ${warningCount}/3`
            });
            setIsModalOpen(true);
        }
        else if(warningCount>=3)
        {
            endExam("Too many warnings");
        }
    },[warningCount])

    const handleWarning = (message) => {
        setWarningCount(prev => {
            const newCount = prev + 1;
            if (newCount > 3) {
                endExam("Too many warnings");
                return newCount;
            }
            setModalContent({
                title: 'Warning',
                message: `${message}. Warning ${newCount}/3`
            });
            setIsModalOpen(true);
            return newCount;
        });
    };

    const endExam = (reason) => {
        setModalContent({
            title: 'Exam Terminated',
            message: `Your exam has been terminated: ${reason}`
        });
        setIsModalOpen(true);
        setTimeout(() => {
            router.push('/student/dashboard');
        }, 3000);
    };

    useEffect(() => {
        if (!quizId) {
            router.push('/student/dashboard');
        }
    }, [quizId]);

    useEffect(() => {
        const fetchquiz = async () => {
            const data = await api.post('http://localhost:5000/api/quiz/get', { quizId });
            const res = data.data;
            setQuestions(res);
        };
        fetchquiz();
    }, [quizId]);

    const optionLetters = ["A", "B", "C", "D"];

    const handleOptionChange = (questionIndex:any, optionIndex:any) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: optionLetters[optionIndex]
        }));
    };

    const handleSubmit = async () => {
        const responses = Object.keys(answers).map(questionIndex => ({
            question_index: parseInt(questionIndex, 10),
            selected_answer: answers[questionIndex]
        }));
        
        const submissionData = {
            quizId: quizId,
            responses: responses,
        };

        try {
            const results = await api.post('http:localhost/api/quiz/submit', submissionData);
            const data = results.data;
            setModalContent({
                title: 'Success',
                message: 'Your response has been recorded.'
            });
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            setModalContent({
                title: 'Error',
                message: 'Failed to submit quiz. Please try again.'
            });
            setIsModalOpen(true);
        }
    };

    const closeModalAndRedirect = () => {
        setIsModalOpen(false);
        if (modalContent.title === 'Success' || modalContent.title === 'Exam Terminated') {
            router.push('/student/dashboard');
        }
    };

    return (
       authorized && <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
            {/* Proctoring Status Bar */}
            <div className="w-full max-w-2xl mb-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        Status: <span className="font-semibold">{faceFeedData.status}</span>
                    </div>
                    <div className="text-sm">
                        Warnings: <span className={`font-semibold ${warningCount > 2 ? 'text-red-600' : 'text-yellow-600'}`}>
                            {warningCount}/3
                        </span>
                    </div>
                </div>
                {faceFeedData.image && (
                    <div className="mt-2">
                        <img 
                            src={`data:image/jpeg;base64,${faceFeedData.image}`}
                            alt="Video Feed"
                            className="w-32 h-24 object-cover rounded"
                        />
                    </div>
                )}
            </div>

            {/* Exam Content */}
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Exam</h1>
                {questions.map((question, index) => (
                    <div key={question._id} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Question {index + 1}: {question.question_text}
                        </h3>
                        <div className="space-y-2">
                            {question.options.map((option, i) => (
                                <div key={i} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`question-${index + 1}-option-${i}`}
                                        name={`question-${index + 1}`}
                                        value={optionLetters[i]}
                                        checked={answers[index + 1] === optionLetters[i]}
                                        onChange={() => handleOptionChange(index + 1, i)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label 
                                        htmlFor={`question-${index + 1}-option-${i}`}
                                        className="ml-2 text-gray-700"
                                    >
                                        {optionLetters[i]}. {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-4"
                >
                    Submit
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                        <h2 className="text-xl font-semibold text-center mb-4">
                            {modalContent.title}
                        </h2>
                        <p className="text-gray-700 text-center mb-6">
                            {modalContent.message}
                        </p>
                        <button
                            onClick={closeModalAndRedirect}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                        >
                            {modalContent.title === 'Warning' ? 'Continue' : 'Go to Dashboard'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}