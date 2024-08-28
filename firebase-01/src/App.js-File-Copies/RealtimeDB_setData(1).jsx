import { useEffect, useState } from 'react';
import { app } from '../firebase'; // Firebase configuration
import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase(app); // Initialize the database

function App() {

  const postData = () => {
    set(ref(db, 'chats/user1'), {  
      userId: 1,
      message: {
        name: 'Theo',
        body: "Hello, I'm Theo Marson ",
      }
    })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
  };



  return (
    <>
      <div className="w-screen h-screen bg-gray-800 text-slate-200">
        <div className="container mx-auto flex flex-col justify-center items-center h-full">
          <h1>Firebase + Vite + React</h1>
          <button 
            type="submit" 
            className="border hover:border-green-400 text-gray-800 active:bg-slate-700 active:text-slate-200 active:border-white"
            onClick={postData}
          >
            Send MSG
          </button>
        
        </div>
      </div>
    </>
  );
}

export default App;
