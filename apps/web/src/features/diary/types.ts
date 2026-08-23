export interface DiaryEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
  updatedAt: string;
}
