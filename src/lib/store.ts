import {
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { ITask, ITaskBoxData } from "components/types";
// import { v4 } from "uuid";

interface IApiTask {
  id: number;
  title: string;
  completed: boolean;
}

const defaultTasks: ITask[] = [
  // { id: v4(), title: 'Something', state: 'TASK_INBOX' },
  // { id: v4(), title: 'Something more', state: 'TASK_INBOX' },
  // { id: v4(), title: 'Something else', state: 'TASK_INBOX' },
  // { id: v4(), title: 'Something again', state: 'TASK_INBOX' },
]

const TaskBoxData: ITaskBoxData = {
  tasks: defaultTasks,
  status: 'idle',
  error: null
}

export const fetchTasks = createAsyncThunk<ITask[], void>('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
  const data: IApiTask[] = await response.json()
  const result: ITask[] = data.map((task: IApiTask) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX'
  }))
  return result
})

const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action: PayloadAction<{ id: string, newTaskState: ITask['state'] }>): void => {
      const { id, newTaskState } = action.payload
      const task = state.tasks.findIndex((task): boolean => task.id === id)
      if (task >= 0) {
        state.tasks[task].state = newTaskState
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state): void => {
        state.status = 'loading',
          state.error = null,
          state.tasks = []
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ITask[]>): void => {
        state.status = 'succeeded',
          state.error = null,
          state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action): void => {
        state.status = 'failed',
          state.error = action.error,
          state.tasks = []
      })
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