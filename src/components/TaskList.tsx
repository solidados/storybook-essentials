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

  if (loading) return <div className='list-items'>Loading...</div>
  if (tasks.length === 0) return <div className='list-items'>Empty</div>

  return (
    <div className="list-items">
      {tasks.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

export default TaskList;