export interface ChatMetaData {
  id: string;
  title: string;
  userId: string;
  lastMessageAt?: string;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    messages: number;
  };
}
