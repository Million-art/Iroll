import React, { useState, useEffect } from 'react';
import AddRemotEmployee from './AddRemotEmployee';
import AssignTask from './AssignTask';
import ViewTask from './ViewTask';
import { useNavigate  } from 'react-router-dom';
import UpdateDeleteTask from './updateDeleteTask';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isRemotAccordionOpen, setIsRemotAccordionOpen] = useState(false);
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');

  const user = userString ? JSON.parse(userString) : {};
  const username = user.first_name.toUpperCase();


  const handleOptionClick = (option) => {
    if (option === 'remotAccordion') {
      // Toggle the accordion only for Remot Employees
      setIsRemotAccordionOpen(!isRemotAccordionOpen);
    }
  
    setSelectedOption(option);
  };
  

  const handleLogout = () => {
    setSelectedOption('logout');
    navigate('/login');  
  };

  useEffect(() => {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
     if (!user || user.role !== 'admin') {
      // Redirect to login if the user is not an admin
      window.location.href = '/login';
    }
  }, []);

  return (
    <section>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Left Panel */}
        <div className="w-62 bg-gray-800 text-white border-r overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
            <div className="space-y-2 mt-32">
               
              <button
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedOption === 'remotAccordion' ? 'bg-blue-500 text-white' : 'hover:bg-blue-500'
                }`}
                onClick={() => handleOptionClick('remotAccordion')}
              >
                Remot Employees
              </button>
              {isRemotAccordionOpen && (
                <div className="mt-2">
                  <ul>
                    <li
                      className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                        selectedOption === 'assignTask' ? 'bg-blue-500 text-white' : ''
                      }`}
                      onClick={() => handleOptionClick('assignTask')}
                    >
                      Assign Task
                    </li>
                    <li
                      className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                        selectedOption === 'addRemotEmployees' ? 'bg-blue-500 text-white' : ''
                      }`}
                      onClick={() => handleOptionClick('updateTask')}
                    >
                      Update Task
                    </li>
                     
                    <li
                      className={`block ml-4 px-4 py-2 rounded hover:bg-blue-500 ${
                        selectedOption === 'viewTask' ? 'bg-blue-500 text-white' : ''
                      }`}
                      onClick={() => handleOptionClick('viewTask')}
                    >
                      View Tasks
                    </li>
                  </ul>
                </div>
              )}
              
               
              <button
                className={`block text-red-500 w-full text-left px-4 py-2 rounded ${
                  selectedOption === 'logout' ? 'text-red-500' : 'hover:bg-blue-500'
                }`}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-4 overflow-y-auto text-black ">
          <h1>👋 WELCOME BACK {username}!</h1>
          {/* Render content based on selectedOption */}
           {selectedOption === 'addRemotEmployees' && <AddRemotEmployee />}
           {selectedOption === 'assignTask' && <AssignTask />}
          {selectedOption === 'viewTask' && <ViewTask />}
          {selectedOption === 'updateTask' && <UpdateDeleteTask />}
           {/* Add more cases as needed */}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
