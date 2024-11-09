import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface GenerateQuizManualProps {
    onClose: () => void;
}

const GenerateQuizManual: React.FC<GenerateQuizManualProps> = ({ onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const requiredColumns = [
        "id", "question", "option a", "option b", "option c", "option d", "right answer"
    ];

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const validateCSV = (file: File): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const csvText = event.target?.result as string;
                const [headerRow] = csvText.split("\n");
                const headers = headerRow.trim().split(",");

                const isValid = requiredColumns.every((col) => headers.includes(col));
                if (isValid) resolve(true);
                else reject(`Invalid CSV format. Expected columns: ${requiredColumns.join(", ")}`);
            };
            reader.onerror = () => reject("Failed to read file");
            reader.readAsText(file);
        });
    };

    const handleUpload = async () => {
        if (!file) {
            setErrorMessage("Please select a CSV file.");
            return;
        }

        try {
            await validateCSV(file);
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('http://localhost:5000/api/quiz/generate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSuccessMessage("File uploaded successfully!");
            } else {
                setErrorMessage("File upload failed. Please try again.");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "File upload failed.");
        }
    };

    const closeModal = () => {
        setSuccessMessage('');
        setErrorMessage('');
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 w-96 z-50">
                    <h2 className="text-xl font-semibold text-center mb-4">Upload Quiz CSV File</h2>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="border rounded-lg w-full p-2"
                    />
                    <button 
                        onClick={handleUpload} 
                        className="bg-purple w-full hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Upload
                    </button>
                    {successMessage && (
                        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                            {successMessage}
                            <button onClick={closeModal} className="ml-2 text-green-700">OK</button>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
                            {errorMessage}
                            <button onClick={() => setErrorMessage('')} className="ml-2 text-red-700">Close</button>
                        </div>
                    )}
                    <button 
                        className="mt-6 bg-gray-300 w-full hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
        </>
    );
};

export default GenerateQuizManual;
