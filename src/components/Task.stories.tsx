import { Meta, StoryObj } from '@storybook/react/*'
import { fn } from '@storybook/test'
import Task from './Task'
import { v4 } from 'uuid';

export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
}

const meta: Meta<typeof Task> = {
  title: 'Todo/Task',
  component: Task,
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {},
  args: {
    ...ActionsData,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    task: {
      id: v4(),
      title: 'Test Task',
      state: 'TASK_INBOX',
    }
  }
}

export const Pinned = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    }
  }
}

export const Archived = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    }
  }
}