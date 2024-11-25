'use client'
import { useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import MailUploader from '../components/mail/mailUploader';
export default function Page() {
  interface Test {
    quiz_id: number;
    title: string;
    duration: string;
    grade:string,
    maxScore:number,
    totalQuestions:number,
    subject:string
    difficulty: string;
  }
  const router=useRouter()
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [addStudent,setAddStudents]=useState(false)
  const [quiz_id, setQuizId] = useState<number | undefined>(undefined)
  const [authorized,setAuthorized]=useState(false)  

  const handleAddStudent=(test:Test)=>{
    setAddStudents(true)
    setQuizId(test.quiz_id)

  }
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

  useEffect(() => {
    const fetchAllTests=async()=>{
        try {
            const response = await api.get('http://localhost:5000/api/quiz/getAll')
            console.log(response.data.data)
            setTests(response.data.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching tests:', error)
            setLoading(false)
        }
    }


    fetchAllTests()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }


  return (
   authorized && <div className="container mx-auto px-4 py-8 font-inter">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple">Available Tests</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {tests.map((test) => (
          <div 
            key={test.quiz_id} 
            className="bg-[#f0ccac] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-grey500"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-offblack mb-4">
                {test.title}
              </h2>
              
              <div className="space-y-4">
                {/* Duration */}
                <div className="flex items-center text-sm text-lightgrey">
                  <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 8V12L15 15" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
                  </svg>
                  <span>{test.duration}</span>
                </div>

                {/* Subject */}
                <div className="flex items-center text-sm text-lightgrey">
                  <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" strokeWidth="1.5"/>
                    <path d="M8 7H16" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 12H16" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 17H12" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Topic: {test.subject}</span>
                </div>

                {/* Total Questions */}
                <div className="flex items-center text-sm text-lightgrey">
                  <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5H16" strokeWidth="1.5"/>
                    <path d="M12 12H12.01" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 16H12.01" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 8H12.01" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Total Questions: {test.totalQuestions}</span>
                </div>

                {/* Max Score */}
                <div className="flex items-center text-sm text-lightgrey">
                  <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 15L8.5 11.5L5 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 15L15.5 11.5L12 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 9L12 2L19 9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 22H20" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Max Score: {test.maxScore}</span>
                </div>

                {/* Grade */}
                <div className="flex items-center text-sm text-lightgrey">
                  <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Grade: {test.grade}</span>
                </div>

                {/* Difficulty */}
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2V6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 18V22" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M4.93 4.93L7.76 7.76" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16.24 16.24L19.07 19.07" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M2 12H6" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M18 12H22" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M4.93 19.07L7.76 16.24" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16.24 7.76L19.07 4.93" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className={`
                    ${test.difficulty === 'Beginner' ? 'text-green' : ''}
                    ${test.difficulty === 'Intermediate' ? 'text-orange' : ''}
                    ${test.difficulty === 'Advanced' ? 'text-red' : ''}
                  `}>
                    {test.difficulty}
                  </span>
                </div>
              </div>

              <div className='flex justify-center items-center gap-4 mt-6'>       
                <button className="w-full bg-gray-700  text-white py-2 px-4 rounded-md hover:bg-bgpurple transition-colors duration-300" onClick={()=>handleAddStudent(test)}>
                  Add Students
                </button>
                <button className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-bgpurple transition-colors duration-300">
                  See Results
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
      {
                addStudent && (
                  <MailUploader dontAdd={setAddStudents} quizId={quiz_id}/>
                )
              }

    </div>
  )
}
  
