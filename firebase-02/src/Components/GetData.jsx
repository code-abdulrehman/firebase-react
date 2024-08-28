import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

const GetData = () => {
  const firebase = useFirebase();

  const [id, setId] = useState("");
  const [ids, setIds] = useState([]);
  const [data, setData] = useState(null);


  // States for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // Handle form submission to create a user and store data in Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const req = await firebase.getData(`users/${id}`);  // Using the random ID as a unique key for Firebase
      setSuccess('Data get successfully!');
      setError('');
      setData(req)
      console.log('Data get:', req);
    } catch (err) {
      setError(err.message);
      console.error('Error adding data:', err.message);
      setSuccess('');
    }
  };
useEffect(()=>{
   const allUsers  = async() => {
        const req = await firebase.getData("users")
        const keys = Object.keys(req)
        setIds(keys)
        console.log(keys)
      }
    allUsers()
},[])
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Get Data</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="text-gray-800">
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 font-medium mb-2">id</label>
            <select
              name="ids"
              id="ids"
              value={id}
              onChange={(e) => setId(e.target.value)}  // Update state on change
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an ID</option>
              {ids.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
    
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Data
          </button>
        </form>

        <div className="w-full flex flex-col border p-2 rounded mt-4 text-black capitalize"> 
        {data&&(<>
        <p>
        <strong>id: </strong>{id}
        </p>
        <p>
        <strong>name:</strong>{data.name} 
        </p>
        <p>
        <strong>city:</strong>{data.city} 
        </p>
        <p>
        <strong>age:</strong>{data.age} 
        </p>
</>
)}
        </div>
      </div>
    </div>
  );
};

export default GetData;
