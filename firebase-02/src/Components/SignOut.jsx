import React from 'react';
import { useFirebase } from '../context/Firebase';
import { FiLogOut } from 'react-icons/fi';  // Optional: Adding a logout icon from React Icons

const SignOut = () => {
  const firebase = useFirebase();

  const handleSignOut = async () => {
    try {
     const req = await firebase.signOutUser();  
      console.log('Signed out successfully', req);
      // Optionally, add some user feedback or redirection here
    } catch (err) {
      console.error('Sign out error:', err.message);
    }
  };

  return (
    <button
      onClick={handleSignOut}  // Add onClick handler to trigger sign-out
      className="flex items-center justify-center py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
    >
      <FiLogOut className="mr-2" size={20} />  {/* Optional: Log out icon */}
      Sign Out
    </button>
  );
};

export default SignOut;
