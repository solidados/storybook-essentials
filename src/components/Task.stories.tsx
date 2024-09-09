import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { v4 } from 'uuid';
import Task from './Task'
import { ITask } from './types';

export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
}

const meta: Meta<typeof Task> = {
  title: 'Todo/Task',
  component: Task,
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    onArchiveTask: { table: { disable: true } },
    onPinTask: { table: { disable: true } }
  },
  args: {
    ...ActionsData,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    task: {
      id: v4(),
      title: 'Test Task',
      state: 'TASK_INBOX' as ITask['state'],
    },
    onArchiveTask: ActionsData.onArchiveTask,
    onPinTask: ActionsData.onPinTask,
  }
}

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args?.task ?? { id: v4(), title: 'Pinned Task', state: 'TASK_PINNED' },
      state: 'TASK_PINNED' as ITask['state'],
    },
    onArchiveTask: ActionsData.onArchiveTask,
    onPinTask: ActionsData.onPinTask,
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...Default.args?.task ?? { id: v4(), title: 'Archived Task', state: 'TASK_ARCHIVED' },
      state: 'TASK_ARCHIVED' as ITask['state'],
    },
    onArchiveTask: ActionsData.onArchiveTask,
    onPinTask: ActionsData.onPinTask,
  },
};