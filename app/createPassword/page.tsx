'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";
import api from "../lib/api";

export default function PasswordAndFaceRecognition() {
  const [email, setEmail] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [faceCoordinates, setFaceCoordinates] = useState<boolean>(false);
  const router=useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [videoFeedSrc, setVideoFeedSrc] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [command, setCommand] = useState<string>("new_face");
  const [username, setUsername] = useState<string>('');
  const [isCaptureVisible, setCaptureVisible] = useState(true);
  const [authorized,setAuthorized]=useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
        const role = jwtDecode(token);
        console.log(role)
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
    const e = searchParams.get('email');
    setEmail(e as string);
    setUsername(e as string)
    return () => {
      if (socket) socket.close();
    };
  }, [searchParams, socket]);

  useEffect(() => {
    startRecognition();
  },[command, username]);
  const startRecognition = () => {
    if (!username || (command !== 'new_face' && command !== 'recognize')) {
      alert('Click picture on a plane background');
      return;
    }

    const newSocket = new WebSocket('ws://localhost:8767');
    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
      newSocket.send(JSON.stringify({ command, username }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.image) {
        setVideoFeedSrc(`data:image/jpeg;base64,${data.image}`);
      } else if (data.match !== undefined) {
        setStatus(data.match
          ? `Thank you, ${username}! Your face has been captured successfully.`
          : `Face detected, but matched with ${data.detected_name} instead of ${username}`
        );
        if (command === 'new_face') setCaptureVisible(false);
      } else if (data.error) {
        setStatus(`Error: ${data.error}`);
      }
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setStatus('WebSocket connection closed');
      setCaptureVisible(false);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('WebSocket error occurred');
    };

    setSocket(newSocket);
  };

  const captureFace = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ command: 'capture' }));
      setStatus('Capturing face...');
      setFaceCoordinates(true)
    } else {
      alert('WebSocket is not open');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess(false);
      return;
    }

    if (!faceCoordinates) {
      setError("Please capture your face coordinates first.");
      return;
    }

    try {
      const response = await api.post('http://localhost:5000/api/updatePassword', {
        email,
        password
      });
      const data = response.data;
      if (data) {
        setSuccess(true);
        setPassword('');
        setConfirmPassword('');
        setFaceCoordinates(false);
      }
    } catch {
      setError("An error occurred while updating your password and coordinates.");
    }
  };

  return (
   authorized&& <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Update Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Password Fields */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Error or Success Message */}
          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
          {success && <div className="text-sm text-green-500 mt-2">Password and Coordinates Updated Successfully. Please Login</div>}

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                {isCaptureVisible && (
          <button onClick={captureFace} className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 mt-4">
            Capture Face
          </button>
        )}
        <div className="mt-4">
          {videoFeedSrc && <img src={videoFeedSrc} alt="Video Feed" style={{ maxWidth: '100%', height: 'auto' }} />}
        </div>
        <div className="mt-4 text-center text-gray-700">{status}</div>
      </div>
    </div>
  );
}
