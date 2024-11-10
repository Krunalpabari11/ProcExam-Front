'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"
import { serialize } from "v8"
import api from "../lib/api"
export default function CreatePassword(){
const [email, setEmail] = useState<string | undefined>()
const searchParams = useSearchParams()

  const [password, setPassword] = useState<string>('')
  const [success,setSuccess]=useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

useEffect(()=>{
   let e= searchParams.get('email')
    setEmail(e as string)
},[])

    const handleSubmit= async(e:any)=>{
        e.preventDefault()
        if(password !== confirmPassword)
        {
            setError("Passwords do not match")
            setSuccess(true)
            console.log("not working")
            return
        }

        const response = await api.post('/api/updatePassword',{
            email,
            password
        })
        const data = await response.data
        if(data)
        {
            setSuccess(true)
            setPassword('')
            setError('')
            setConfirmPassword('')  
            console.log("Password Updated")
        }
       

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Update Your Password</h2>
    
            <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  disabled
                  className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              {/* Error Message */}
              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
              {success && <div className="text-sm text-green-500 mt-2">New Password SuccessFull Updated</div>}

    
              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    
}