export interface ITask {
  id: string;
  title: string;
  state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
}

export interface ITaskProps {
  task: ITask;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}

export interface ITaskListProps {
  loading: boolean;
  tasks: ITask[];
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

export interface ITaskBoxData {
  tasks: ITask[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: Error | null;
}
