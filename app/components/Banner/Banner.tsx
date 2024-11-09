"use client"
import { useState } from 'react';
// import GenerateQuizManual from './GenerateQuizManual';

const Banner = ({text}:any) => {
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
            <div className=" px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
                          {text}
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

                  
                    
                </div>
            </div>

            
        </main>
    );
}

export default Banner;
