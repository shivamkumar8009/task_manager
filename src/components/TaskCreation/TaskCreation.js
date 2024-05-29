import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/taskSlice";
import "./TaskCreation.css";

function TaskCreation() {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedTo: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleAddTask = async () => {
    await dispatch(addTask(taskData));
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      assignedTo: "",
    });
    setShowForm(false);
  };

  return (
    <div className="TaskCreation">
      {!showForm && (
        <button
          type="button"
          className="btn btn-warning taskCreate-button"
          onClick={() => setShowForm(true)}
        >
          Create Task
        </button>
      )}
      {showForm && (
        <div className="taskCreationContent">
          <p className="TaskCreationTitle">
            <b>Create Task</b>
          </p>
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
            <button className="button-blue" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCreation;
