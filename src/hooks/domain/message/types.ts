export type MessageRole = 'user' | 'bot';
export type MessageType = 'IMG' | 'TXT';

export type DisplayMessage = {
  id: string; //uuid
  role: MessageRole;
  type: MessageType;
  content: string; // content is either uri or text parsed using the type
  sentAt: number;
};
