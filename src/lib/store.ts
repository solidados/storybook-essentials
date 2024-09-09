import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, ITaskBoxData } from "components/types";
import { v4 } from "uuid";

const defaultTasks: ITask[] = [
  { id: v4(), title: 'Something', state: 'TASK_INBOX' },
  { id: v4(), title: 'Something more', state: 'TASK_INBOX' },
  { id: v4(), title: 'Something else', state: 'TASK_INBOX' },
  { id: v4(), title: 'Something again', state: 'TASK_INBOX' },
]

const TaskBoxData: ITaskBoxData = {
  tasks: defaultTasks,
  status: 'idle',
  error: null
}

const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action: PayloadAction<{id: string, newTaskState: ITask['state']}>) => {
      const { id, newTaskState } = action.payload
      const task = state.tasks.findIndex((task) => task.id === id)
      if (task >= 0) {
        state.tasks[task].state = newTaskState
      }
    }
  }
})

export const { updateTaskState } = TasksSlice.actions

const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store