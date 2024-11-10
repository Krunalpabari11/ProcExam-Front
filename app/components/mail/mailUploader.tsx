'use client'
import api from "../../lib/api"
import { useEffect,useState } from "react"

export default function MailUploader({dontAdd,quizId}:any){

 
    const [file,setFile]=useState<File | null>(null)
    const [successMessage,setSuccess]=useState(false)
    const [errorMessage,setError]=useState(false)
    const handleCSVUpload = async () => {
        if(!file)
        {
            console.log("Please upload file");
            setError(true)
            return ;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('quizId', quizId);
        console.log(JSON.stringify(formData)+"  formDAta")
       const response =await  api.post('http://localhost:5000/api/uploadMails',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
       })
       const data=await response.data

        if(data)
        {
            setSuccess(true)
            setFile(null)
            dontAdd(false)

        }

    }

    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 z-50">
                <h2 className="text-xl font-semibold text-center mb-4">Upload Mail CSV To Add Students</h2>
                <input
                    type="file"
                    accept=".csv"
                    className="border rounded-lg w-full p-2"
                    onChange={(e)=>{setFile(e.target.files?.[0] || null)}}
                />
                <button 
                    className="bg-purple-700   w-full hover:bg-purple-700   text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleCSVUpload}
                >
                    Upload

                </button>
                <button 
                    className="mt-6 bg-gray-300 w-full hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                    onClick={()=>{dontAdd(false)}}
                >
                    Cancel
                </button>
            </div>
        </div>
        
        <div className="fixed inset-0 bg-black opacity-50 z-40" >

        {successMessage && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                        File uploaded successfully
                        <button onClick={()=>{setSuccess(false)}} className="ml-2 text-green-700">OK</button>
                    </div>
                )}

            {errorMessage && (
                    <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
                        Please upload a file
                        <button onClick={() => setError(false)} className="ml-2 text-red-700">Close</button>
                    </div>
                )}
                </div>


    </>
    )
}