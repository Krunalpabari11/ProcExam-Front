import axios from "axios";
import { AppContext } from "@/app/lib/AppContext";
import { useContext, useState } from "react";
import api from '../../lib/api';

export default function GenerateQuizAi({ onClose }: any) {   
    const { examData, setExamData } = useContext(AppContext);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
    
    const handleUpload = async () => {
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const difficulty = (document.getElementById("difficulty") as HTMLInputElement).value;
        const grade = (document.getElementById("stream") as HTMLSelectElement).value;
        const subject = (document.getElementById("topic") as HTMLSelectElement).value;
        const duration = (document.getElementById("duration") as HTMLInputElement).value;
        const totalQuestions = (document.getElementById("total") as HTMLInputElement).value;
        const maxScore = (document.getElementById("max") as HTMLInputElement).value;

        const data = {
            title,
            difficulty,
            grade,
            subject,
            duration,
            totalQuestions,
            maxScore
        };

        try {
            const response = await api.post('http://localhost:5000/api/aiquiz/generate', data);
            const value = await response.data;
            console.log(value);
            setExamData(value);
            onClose()
            setShowSuccessModal(true); // Show success modal
            
        } catch (e) {
            setError("Some error has occurred");
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 w-96 z-50">
                    <h2 className="text-xl font-semibold text-center mb-4">Please Provide The Below Details</h2>

                    <label className="text-sm font-semibold">Unique Title</label>
                    <input required id="title" type="text" className="border rounded-lg w-full p-2" />

                    <label className="text-sm font-semibold">Difficulty</label>
                    <select id="difficulty" required className="border rounded-lg w-full p-2">
                        <option value="" disabled selected>Select difficulty</option>
                        <option value="easy">EASY</option>
                        <option value="medium">MEDIUM</option>
                        <option value="hard">HARD</option>
                    </select>

                    <label className="text-sm font-semibold">Stream</label>
                    <input required id="stream" type="text" className="border rounded-lg w-full p-2" />
                    
                    <label className="text-sm font-semibold">Topic</label>
                    <input required id="topic" type="text" className="border rounded-lg w-full p-2" />

                    <label className="text-sm font-semibold">Duration</label>
                    <input required id="duration" type="text" className="border rounded-lg w-full p-2" />

                    <label className="text-sm font-semibold">Total Questions</label>
                    <input required id="total" type="text" className="border rounded-lg w-full p-2" />

                    <label className="text-sm font-semibold">Max Score</label>
                    <input required id="max" type="text" className="border rounded-lg w-full p-2" />

                    <button 
                        onClick={handleUpload} 
                        className="bg-purple w-full hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Generate
                    </button>
                    <button 
                        onClick={() => { onClose(); }} 
                        className="bg-purple border-purple w-full text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-80 text-center">
                        <h2 className="text-xl font-semibold text-green-600 mb-4">Test Generated Successfully!</h2>
                        <button 
                            onClick={() => { setShowSuccessModal(false); onClose(); }} 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
