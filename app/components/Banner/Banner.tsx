"use client"
import { useState } from 'react';
import Dropdownone from './Dropdownone';
import Dropdowntwo from './Dropdowntwo';
import GenerateQuizManual from './GenerateQuizManual';

const Banner = () => {
    const [showModal, setShowModal] = useState(false);
    const [showGenerateManualModal, setShowGenerateManualModal] = useState(false);

    const handleGenerateTestClick = () => {
        setShowModal(true); 
    };

    const handleOptionClick = (option: string) => {
        if (option === 'generate the quiz manually') {
            setShowGenerateManualModal(true);  // Show GenerateQuizManual modal
        }
        alert(`Are you sure you want to ${option}?`);
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <main className='banner-image'>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
                            Advance your engineering <br /> skills with our courses
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-black">
                            Build skills with our courses and mentor from world-class companies.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <div className="hidden sm:block -space-x-2 overflow-hidden">
                                {/* Profile Images */}
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                {/* More images */}
                            </div>
                            <div className='bannerBorder sm:pl-8'>
                                <div className='flex justify-center sm:justify-start'>
                                    <h3 className='text-2xl font-semibold mr-2'>4.6</h3>
                                    <img src={'/assets/banner/Stars.svg'} alt="stars-icon" />
                                </div>
                                <div>
                                    <h3 className='text-sm'>Rated by 25k on google.</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DROPDOWN BUTTONS */}
                    <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                            <div className="col-span-3">
                                <Dropdownone />
                            </div>
                            <div className="col-span-3">
                                <Dropdowntwo />
                            </div>
                            <div className="col-span-3 sm:col-span-2 mt-2">
                                <button 
                                    className="bg-purple w-full hover:bg-purple-700 text-white font-bold py-4 px-3 rounded"
                                    onClick={handleGenerateTestClick}
                                >
                                    Generate Test 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Generate Quiz Options */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-80 z-50">
                        <h2 className="text-xl font-semibold text-center mb-4">Choose Quiz Type</h2>
                        <div className="space-y-4">
                            <button 
                                className="bg-purple w-full hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleOptionClick('generate the quiz manually')}
                            >
                                Generate Quiz Manually
                            </button>
                            <button 
                                className="bg-purple w-full hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
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
        </main>
    );
}

export default Banner;
