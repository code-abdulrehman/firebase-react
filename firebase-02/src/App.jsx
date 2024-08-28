import react from 'react';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import PutData  from './Components/PutData';
import GetData  from './Components/GetData';
import GoogleSignupButton from './Components/GoogleSignupButton';
import SignOut from './Components/SignOut';
import { useFirebase } from './context/Firebase';



function App() {
const {currentUser} = useFirebase()


  return (
    <>
      <div className="w-screen min-h-screen bg-gray-800 text-slate-200">
        <div className="container mx-auto flex flex-col gap-4 justify-center items-center h-full">
          <h1>Firebase + Vite + React</h1>
          {currentUser?<div>
            <div className='flex gap-6 flex-col md:flex-row'>
          <PutData/>
          <GetData/>
            </div>
            <br />
          <SignOut/>
          </div>:<>
            <div className='flex gap-6 flex-col md:flex-row'>

<SignUp />
<SignIn />
          </div>
<GoogleSignupButton/>
          </>}
          {/* <PutData/> */}



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
