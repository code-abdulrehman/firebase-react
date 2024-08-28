import { useEffect, useState } from 'react';
import { app } from './firebase'; // Firebase configuration
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Signup from './App.js-File-Copies/SignUp(2)';
import SignIn from './App.js-File-Copies/SignIn(3)';

function App() {
  


  return (
    <>
      <div className="w-screen h-screen bg-gray-800 text-slate-200">
        <div className="container mx-auto flex flex-col gap-4 justify-center items-center h-full">
          <h1>Firebase + Vite + React</h1>


          <Signup/>
          <SignIn/>



          <br />
          <button 
            type="submit" 
            className="border hover:border-green-400 text-gray-800 active:bg-slate-700 active:text-slate-200 active:border-white"
            onClick={()=> null}
          >
           null
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
