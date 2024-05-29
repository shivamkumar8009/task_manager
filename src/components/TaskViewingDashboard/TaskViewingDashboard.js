import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  setStatusFilter,
  setPriorityFilter,
  setDueDateFilter,
  setAssigneeFilter,
  clearFilters,
} from "../../store/taskSlice.js";
import "./TaskViewingDashboard.css";

function TaskViewingDashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskData.tasks);
  const statusFilter = useSelector((state) => state.taskData.statusFilter);
  const priorityFilter = useSelector((state) => state.taskData.priorityFilter);
  const dueDateFilter = useSelector((state) => state.taskData.dueDateFilter);
  const assigneeFilter = useSelector((state) => state.taskData.assigneeFilter);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      if (statusFilter && task.status !== statusFilter) return false;
      if (priorityFilter && task.priority !== priorityFilter) return false;
      if (dueDateFilter && task.dueDate !== dueDateFilter) return false;
      if (assigneeFilter && task.assignedTo !== assigneeFilter) return false;
      return true;
    });
    setFilteredTasks(filtered);
  }, [tasks, statusFilter, priorityFilter, dueDateFilter, assigneeFilter]);

  const handleStatusChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const handlePriorityChange = (e) => {
    dispatch(setPriorityFilter(e.target.value));
  };

  const handleDueDateChange = (e) => {
    dispatch(setDueDateFilter(e.target.value));
  };

  const handleAssigneeChange = (e) => {
    dispatch(setAssigneeFilter(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleStatusChangeTask = async (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, status: newStatus }));
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className="TaskViewingDashboard">
      <div className="TaskViewingDashboardTitle">Dashboard</div>
      <div className="TaskViewingDashboardBottom">
        <div className="filter-container">
          <select
            value={statusFilter}
            onChange={handleStatusChange}
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
            onChange={handlePriorityChange}
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
            onChange={handleDueDateChange}
            className="filter-date"
          />
          <select
            value={assigneeFilter}
            onChange={handleAssigneeChange}
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
                          handleStatusChangeTask(task.id, e.target.value)
                        }
                        className="select-status"
                      >
                        <option value="">Select Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <img
                      src="delete.png"
                      alt="Delete Task"
                      className="deleteButton"
                      onClick={() => handleDeleteTask(task.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskViewingDashboard;
