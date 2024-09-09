import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState, updateTaskState } from '../lib/store';
import { ITaskBoxData, ITask } from './types';

import Task from './Task';

const TaskList = (): React.ReactElement => {
  const tasks = useSelector((state: RootState): ITask[] => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((task: ITask): boolean => task.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((task: ITask): boolean => task.state !== "TASK_PINNED"),
    ]
    const filteredTasks = tasksInOrder.filter(task => task.state === 'TASK_INBOX' || task.state === 'TASK_PINNED')

    return filteredTasks
  })

  const { status } = useSelector((state: RootState): ITaskBoxData => state.taskbox)

  const dispatch: AppDispatch = useDispatch()

  const pinTask = (id: string): void => {
    dispatch(updateTaskState({ id, newTaskState: 'TASK_PINNED' }))
  }

  const archiveTask = (id: string): void => {
    dispatch(updateTaskState({ id, newTaskState: 'TASK_ARCHIVED' }))
  }

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  )

  if (status === 'loading') {
    return (<div className='list-items' data-testid="loading" key={'loading'}>
      {Array(tasks.length || 6)
        .fill(0)
        .map((_, index: number): React.ReactNode => (
          <div key={index}>{LoadingRow}</div>
        ))
      }
    </div>)
  }

  if (tasks.length === 0) return (
    <div className='list-items' data-testid="empty" key={'empty'}>
      <div className="wrapper-message">
        <span className='icon-check' />
        <p className="title-message">You have no tasks</p>
        <p className="subtitle-message">Sit back and relax</p>
      </div>
    </div>
  )

  return (
    <div className="list-items" data-testid='success' key={"success"}>
      {tasks.map((task: ITask): React.ReactNode => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task): void => pinTask(task)}
          onArchiveTask={(task): void => archiveTask(task)}
        />
      ))}
    </div>
  );
}

export default TaskList;