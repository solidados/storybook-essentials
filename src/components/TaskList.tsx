import React from 'react';
import Task from './Task'

interface Task {
  id: string;
  title: string;
  state: string;
}

interface TaskListProps {
  loading: boolean,
  tasks: Task[],
  onPinTask: (id: string) => void,
  onArchiveTask: (id: string) => void,
}

const TaskList: React.FC<TaskListProps> = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask
  }

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  )

  if (loading) return (
    <div className='list-items' data-testid="loading" key={'loading'}>
      {Array(tasks.length || 6)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{LoadingRow}</div>
        ))
      }
    </div>
  )

  if (tasks.length === 0) return (
    <div className='list-items' data-testid="empty" key={'empty'}>
      <div className="wrapper-message">
        <span className='icon-check' />
        <p className="title-message">You have no tasks</p>
        <p className="subtitle-message">Sit back and relax</p>
      </div>
    </div>
  )

  const tasksInOrder = [
    ...tasks.filter((task): boolean => task.state === "TASK_PINNED"),
    ...tasks.filter((task): boolean => task.state !== "TASK_PINNED"),
  ]

  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

export default TaskList;