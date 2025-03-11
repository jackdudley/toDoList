export interface Task {
    id: number;
    content: string;
    completed: boolean;
    task_length: number | null;
    dueDate: string;
    description: string;
}