import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';

const PutData = () => {
  const firebase = useFirebase();

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
  });

  // Generate a random ID for the user

  const [id] = useState(() => Math.floor(Math.random() * 1000) + new Date().getSeconds() - new Date().getMilliseconds());

  // States for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to create a user and store data in Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await firebase.putData(`users/${id}`, formData);  // Using the random ID as a unique key for Firebase
      setSuccess('Data added successfully!');
      setError('');
      console.log('Data added:', formData);
    } catch (err) {
      setError(err.message);
      console.error('Error adding data:', err.message);
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Put Data</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="text-gray-800">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              min={5}
              max={60}
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Put Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default PutData;
