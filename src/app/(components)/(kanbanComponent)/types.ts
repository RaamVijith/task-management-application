export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export type Task = {
  id: string;
  taskName:string;
  priority:string;
  status: TaskStatus;
  dueDate:string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};