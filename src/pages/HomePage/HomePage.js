import React, { useState } from 'react';
import TaskCreation from '../../components/TaskCreation/TaskCreation';
import TaskViewingDashboard from '../../components/TaskViewingDashboard/TaskViewingDashboard';
import './HomePage.css';

function HomePage() {
  const [tasks, setTasks] = useState([]);

  const handleAddTasks = (newTasks) => {
    setTasks([...tasks, ...newTasks]);
  };

  return (
    <div className="HomePage">
      <div className="nav">Task Management System</div>
      <div className="mainContainer">
      <TaskCreation onAddTasks={handleAddTasks} />
      <TaskViewingDashboard tasks={tasks} setTasks={setTasks} /> 
      </div>
     
    </div>
  );
}

export default HomePage;
