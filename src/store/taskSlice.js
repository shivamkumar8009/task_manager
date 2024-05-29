// taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(
    "https://6652d7f9813d78e6d6d65e3d.mockapi.io/v1/tasks"
  );
  const data = await response.json();
  return data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await fetch(
    "https://6652d7f9813d78e6d6d65e3d.mockapi.io/v1/tasks",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  const newTask = await response.json();
  return newTask;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  const response = await fetch(
    `https://6652d7f9813d78e6d6d65e3d.mockapi.io/v1/tasks/${task.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  const updatedTask = await response.json();
  return updatedTask;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await fetch(`https://6652d7f9813d78e6d6d65e3d.mockapi.io/v1/tasks/${id}`, {
    method: "DELETE",
  });
  return id;
});

const tasksSlice = createSlice({
  name: "taskData",
  initialState,
  reducers: {
    clearFilters(state) {
      state.statusFilter = "";
      state.priorityFilter = "";
      state.dueDateFilter = "";
      state.assigneeFilter = "";
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setPriorityFilter(state, action) {
      state.priorityFilter = action.payload;
    },
    setDueDateFilter(state, action) {
      state.dueDateFilter = action.payload;
    },
    setAssigneeFilter(state, action) {
      state.assigneeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const {
  clearFilters,
  setStatusFilter,
  setPriorityFilter,
  setDueDateFilter,
  setAssigneeFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;
