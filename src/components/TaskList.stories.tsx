import { Provider } from 'react-redux'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Meta, StoryObj } from '@storybook/react/*'
import { v4 } from 'uuid'
import TaskList from './TaskList'
import { ITaskBoxData, ITask } from './types';

export const MockedState: ITaskBoxData = {
  tasks: [
    { id: v4(), title: 'Task 1', state: 'TASK_INBOX' },
    { id: v4(), title: 'Task 2', state: 'TASK_INBOX' },
    { id: v4(), title: 'Task 3', state: 'TASK_INBOX' },
    { id: v4(), title: 'Task 4', state: 'TASK_INBOX' },
    { id: v4(), title: 'Task 5', state: 'TASK_INBOX' },
    { id: v4(), title: 'Task 6', state: 'TASK_INBOX' },
  ],
  status: 'idle',
  error: null
}

interface MockstoreProps {
  taskboxState: ITaskBoxData;
  children: React.ReactNode;
}

const Mockstore: React.FC<MockstoreProps> = ({ taskboxState, children }): React.ReactElement => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action: PayloadAction<{ id: string; newTaskState: ITask['state'] }>): void => {
              const { id, newTaskState } = action.payload
              const task = state.tasks.findIndex((task): boolean => task.id === id)
              if (task >= 0) {
                state.tasks[task].state = newTaskState
              }
            }
          }
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
)

const meta: Meta<typeof TaskList> = {
  title: 'Todo/TaskList',
  component: TaskList,
  tags: ['autodocs'],
  decorators: [
    (story) => <div style={{ margin: '3rem' }}>{story()}</div>
  ],
  excludeStories: /.*MockedState$/,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
  ]
}

export const WithPinnedTasks: Story = {
  decorators: [
    (story) => {
      const pinnedtasks: ITask[] = MockedState.tasks.map((task) =>
        task.title === 'Task 6'
          ? { ...task, title: 'Task 6 (pinned)', state: 'TASK_PINNED' }
          : task
      );

      return (
        <Mockstore taskboxState={{ ...MockedState, tasks: pinnedtasks }}>
          {story()}
        </Mockstore>
      );
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{ ...MockedState, status: 'loading' }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{ ...MockedState, tasks: [] }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};