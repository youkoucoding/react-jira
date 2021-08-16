export interface Task {
  id: number;
  name: string;
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}
