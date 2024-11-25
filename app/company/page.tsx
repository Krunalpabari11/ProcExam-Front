'use client'
import Banner from "../components/Banner/Banner"
import { useState,useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import GenerateQuizManual from "../components/Quiz/GenerateQuizManual";
import GenerateQuizAi from "../components/Quiz/GenerateQuizAi";
import { useRouter } from "next/navigation";
export default function Page(){
    const [showModal, setShowModal] = useState(false);
    const [showGenerateManualModal, setShowGenerateManualModal] = useState(false);
    const [generateusingAi, setGenerateusingAi] = useState(false);
    const [authorized,setAuthorized]=useState(false)
    const router=useRouter();


    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
            const role = jwtDecode(token);
            if (role.role === 'student') {
                router.push('/student/dashboard');
            }
            setAuthorized(true)
        }
        else{
            router.push('/')
        }
        
    },[])
    
    const handleGenerateTestClick = () => {
        setShowModal(true); 
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleOptionClick = (option: string) => {
        if (option === 'generate the quiz manually') {
            setShowGenerateManualModal(true);  
        }
        else{
            setGenerateusingAi(true)
        }

        setShowModal(false);
    };
    const closeGenerateAi=()=>{
        console.log("calling")
        setGenerateusingAi(false)
    }


    return (
      authorized &&  <div>
            <Banner text={"Welcome Company"}></Banner>
            <div className="col-span-3 sm:col-span-2 mt-2 mb-10 flex items-center justify-center">
                                <button 
                                    className="bg-purple-400 w-48 hover:bg-dark-700 text-white font-bold py-4 px-3 rounded "
                                    onClick={handleGenerateTestClick}
                                >
                                    Generate Test 
                                </button>
                            </div>

                            <div className="col-span-3 sm:col-span-2 mt-2 mb-10 flex items-center justify-center">
                                <button 
                                    className="bg-green-400 w-48 hover:bg-dark-700 text-white font-bold py-4 px-3 rounded "
                                    onClick={()=>{router.push('/allTest')}}
                                >
                                    See All Tests
                                </button>
                            </div>


                            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-80 z-50">
                        <h2 className="text-xl font-semibold text-center mb-4">Choose Quiz Type</h2>
                        <div className="space-y-4">
                            <button 
                                className="bg-purple-700   w-full hover:bg-purple-700   text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleOptionClick('generate the quiz manually')}
                            >
                                Generate Quiz Manually
                            </button>
                            <button 
                                className="bg-purple-700   w-full hover:bg-purple-700   text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleOptionClick('generate the quiz using AI')}
                            >
                                AI Generated Quiz
                            </button>
                        </div>
                        <button 
                            className="mt-6 bg-gray-300 w-full hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                    
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                </div>
            )}

            {/* GenerateQuizManual Modal */}
            {showGenerateManualModal && (
                <GenerateQuizManual onClose={() => setShowGenerateManualModal(false)} />
            )}
            {generateusingAi && (
                <GenerateQuizAi onClose={closeGenerateAi}/>
            )

            }
        </div>
    )
}