import React, { useState, useEffect } from "react";
import "./TaskViewingDashboard.css";

function TaskViewingDashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedTo: "",
    status: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://66346c589bb0df2359a17e03.mockapi.io/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "status":
        setStatusFilter(value);
        break;
      case "priority":
        setPriorityFilter(value);
        break;
      case "dueDate":
        setDueDateFilter(value);
        break;
      case "assignee":
        setAssigneeFilter(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let filtered = tasks;
    if (statusFilter) {
      filtered = filtered.filter((task) =>
        task.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }
    if (priorityFilter) {
      filtered = filtered.filter(
        (task) => task.priority.toLowerCase() === priorityFilter.toLowerCase()
      );
    }
    if (dueDateFilter) {
      filtered = filtered.filter((task) => task.dueDate === dueDateFilter);
    }
    if (assigneeFilter) {
      filtered = filtered.filter(
        (task) => task.assignedTo.toLowerCase() === assigneeFilter.toLowerCase()
      );
    }
    setFilteredTasks(filtered);
  }, [tasks, statusFilter, priorityFilter, dueDateFilter, assigneeFilter]);

  const handleClearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    setDueDateFilter("");
    setAssigneeFilter("");
    setFilteredTasks(tasks);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);

      await fetch(`https://66346c589bb0df2359a17e03.mockapi.io/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleReassignTask = async (taskId, newAssignee) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, assignedTo: newAssignee } : task
      );
      setTasks(updatedTasks);

      await fetch(`https://66346c589bb0df2359a17e03.mockapi.io/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignedTo: newAssignee }),
      });
    } catch (error) {
      console.error("Error reassigning task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetch(`https://66346c589bb0df2359a17e03.mockapi.io/api/tasks/${taskId}`, {
          method: "DELETE",
        });
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedTaskData(task);
  };

  const handleSaveEditedTask = async () => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === editedTaskData.id ? editedTaskData : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditedTaskData({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        assignedTo: "",
        status: "",
      });

      await fetch(`https://66346c589bb0df2359a17e03.mockapi.io/api/tasks/${editedTaskData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTaskData),
      });
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };

  const handleChangeEditedTask = (e) => {
    const { name, value } = e.target;
    setEditedTaskData({
      ...editedTaskData,
      [name]: value,
    });
  };

  return (
       <div className="TaskViewingDashboard">
       <div className="TaskViewingDashboardTitle">Dashboard</div>
       <div className="TaskViewingDashboardBottom">
         <div className="filter-container">
           <select
            value={statusFilter}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="filter-select"
          >
            <option value="">Filter by Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="filter-select"
          >
            <option value="">Filter by Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={dueDateFilter}
            onChange={(e) => handleFilterChange("dueDate", e.target.value)}
            className="filter-date"
          />
          <select
            value={assigneeFilter}
            onChange={(e) => handleFilterChange("assignee", e.target.value)}
            className="filter-select"
          >
            <option value="">Filter by Assignee</option>
            {[...new Set(tasks.map((task) => task.assignedTo))].map(
              (assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              )
            )}
          </select>
          <button className="filter-button" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
        <div className="task-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  {editingTask === task ? (
                    <td colSpan="7">
                      <div className="editContainer">
                        <input
                          type="text"
                          name="title"
                          value={editedTaskData.title}
                          onChange={handleChangeEditedTask}
                          className="input-edit-container"
                        />
                        <textarea
                          name="description"
                          value={editedTaskData.description}
                          onChange={handleChangeEditedTask}
                          className="description-container"
                        ></textarea>
                        <input
                          type="date"
                          name="dueDate"
                          value={editedTaskData.dueDate}
                          onChange={handleChangeEditedTask}
                          className="input-edit-container"
                        />
                        <select
                          name="priority"
                          value={editedTaskData.priority}
                          onChange={handleChangeEditedTask}
                          className="select-edit"
                        >
                          <option value="">Select Priority</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        <input
                          type="text"
                          name="assignedTo"
                          value={editedTaskData.assignedTo}
                          onChange={handleChangeEditedTask}
                          className="input-edit-container"
                        />
                        <select
                          name="status"
                          value={editedTaskData.status}
                          onChange={handleChangeEditedTask}
                          className="select-edit"
                        >
                          <option value="">Select Status</option>
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                        <button
                          className="filter-button"
                          onClick={handleSaveEditedTask}
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.priority}</td>
                      <td>{task.assignedTo}</td>
                      <td>
                      <div className="status-color-div">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task.id, e.target.value)
                          }
                          className="select-status"
                        >
                          <option value="">Select Status</option>
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                        <div
                          className="status-circle"
                          style={{ backgroundColor: getStatusColor(task.status) }}
                        ></div>
                        </div>
                      </td>
                      <td>
                        <img
                          src="edit.png"
                          alt="Edit Task"
                          className="editButton"
                          onClick={() => handleEditTask(task)}
                        />
                        <img
                          src="delete.png"
                          alt="Delete Task"
                          className="deleteButton"
                          onClick={() => handleDeleteTask(task.id)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
    switch (status) {
      case "Open":
        return "white";
      case "In Progress":
        return "green";
      case "Completed":
        return "yellow";
      case "Blocked":
        return "red";
      default:
        return "gray";
    }
  }

export default TaskViewingDashboard;
