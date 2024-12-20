export interface Task {
  id: number;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed';
  checkedBy: { name: string; timestamp: string }[];
  lastUpdated: string;
  memo: { text: string; author: string; timestamp: string } | null;
  attachments: { name: string; url: string }[];
}

export interface Category {
  id: number;
  name: string;
  tasks: Task[];
}

