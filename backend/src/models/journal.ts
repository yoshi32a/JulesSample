export interface Journal {
  id: string;
  title: string;
  content: string;
  date: string; // ISO String
  tags?: string[];
}
