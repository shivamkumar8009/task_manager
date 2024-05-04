import React, { useState } from 'react';
import './TaskCreation.css';

function TaskCreation({ onAddTasks }) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    assignedTo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch('https://66346c589bb0df2359a17e03.mockapi.io/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (response.ok) {
        const newTask = await response.json();
        onAddTasks([newTask]);
        setTaskData({
          title: '',
          description: '',
          dueDate: '',
          priority: '',
          assignedTo: '',
        });
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
      alert('Failed to add task');
    }
  };

  return (
    <div className="TaskCreation">
      <div className="taskCreationContent">
        <p className="TaskCreationTitle"><b>Create Task</b></p>
        <div className="form-container">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={taskData.title}
            onChange={handleChange}
            className="input-container"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={taskData.description}
            onChange={handleChange}
            className="description-container"
          ></textarea>
          <input
            type="date"
            name="dueDate"
            placeholder="Due Date"
            value={taskData.dueDate}
            onChange={handleChange}
            className="input-container"
          />
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="input-container"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={taskData.assignedTo}
            onChange={handleChange}
            className="input-container"
          />
          <button className="button-blue" onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCreation;
