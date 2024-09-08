import { Meta, StoryObj } from '@storybook/react/*'
import { v4 } from 'uuid'
import * as TaskStories from './Task.stories'
import TaskList from './TaskList'

const meta: Meta<typeof TaskList> = {
  title: 'Todo/TaskList',
  component: TaskList,
  tags: ['autodocs'],
  decorators: [
    (story) => <div style={{ margin: '3rem' }}>{story()}</div>
  ],
  argTypes: {
    ...TaskStories.ActionsData,
  },
  args: {}
}

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    tasks: [
      { ...TaskStories.Default.args.task, id: v4(), title: 'Task 1' },
      { ...TaskStories.Default.args.task, id: v4(), title: 'Task 2' },
      { ...TaskStories.Default.args.task, id: v4(), title: 'Task 3' },
      { ...TaskStories.Default.args.task, id: v4(), title: 'Task 4' },
      { ...TaskStories.Default.args.task, id: v4(), title: 'Task 5' },
      { ...TaskStories.Default.args.task, id: v4(), title: 'Task 6' },
    ]
  }
}

export const WithPinnedTasks = {
  args: {
    tasks: Default.args.tasks.map(task => task.title === 'Task 6' ? { title: 'Task 6 (pinned)', state: 'TASK_PINNED' } : task
    ),
  }
}

export const Loading = {
  args: {
    tasks: [],
    loading: true
  }
}

export const Empty = {
  args: {
    ...Loading.args,
    loading: false
  }
}