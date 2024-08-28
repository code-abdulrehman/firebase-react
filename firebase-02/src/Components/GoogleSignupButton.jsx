import React from 'react';
import { FcGoogle } from 'react-icons/fc';  // Import the Google icon from react-icons
import { useFirebase } from '../context/Firebase';

const GoogleSignupButton = () => {
  const firebase = useFirebase();

    const handleGooglePopup = async () => {
        try{
          const req = await  firebase.signupWithGoogle() 
          // localStorage.setItem("token", req._tokenResponse.idToken) 
          console.log(req)
        }catch(err){
          console.log(err)
        }
      
      }
  return (
    <button
      onClick={handleGooglePopup}  // Your signup function
      className="max-w-md text-gray-800 flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-0"
    >
      <FcGoogle className="mr-2" size={24} /> {/* Google icon with some margin to the right */}
      Signup with Google
    </button>
  );
};

export default GoogleSignupButton;
