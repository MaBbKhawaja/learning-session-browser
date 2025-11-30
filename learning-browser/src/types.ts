export interface Session {
  id: string;
  title: string;
  tags: string[];
  mins: string;
  difficulty: string | null;
  popularity: number;
  updatedAt: string;
  completed: boolean;
}

