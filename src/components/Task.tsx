import { FC } from 'react'

interface TaskProps {
  task: {
    id: string,
    title: string,
    state: string
  },
  onArchiveTask: (id: string) => void,
  onPinTask: (id: string) => void
}

const Task: FC<TaskProps> = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => {
  return (
    <div className="list-item">
      <label htmlFor={`title-${id}`} area-label={title}>
        <input type="text" value={title} readOnly={true} name={title} id={`title-${id}`} />
      </label>
      <button onClick={(): void => onArchiveTask(id)}>Archive</button>
      <button onClick={(): void => onPinTask(id)}>Pin</button>
    </div>
  );
}

export default Task;