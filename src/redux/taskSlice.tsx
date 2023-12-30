import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskType = {
  name: string;
  id: string;
  status: string;
};

type InitType = {
  tasks: TaskType[];
};

const initialState: InitType = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskType>) {
      state.tasks.push(action.payload); // This seems like a mutation, but Immer handles it immutably
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<{ id: string; updatedTask: Partial<TaskType> }>) {
      const { id, updatedTask } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        Object.assign(existingTask, updatedTask);
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
