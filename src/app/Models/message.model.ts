export type MessageRole = 'user' | 'model';

export interface Message {
  id: string;
  chatId: string;
  replyOf?: string | null;
  userId: string;
  role: MessageRole;
  content: string[];
  createdAt?: string;
  updatedAt?: string;
}
