export interface GetChat {
  id: number;
  message: string;
  isRead: boolean;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
  senderId: SenderId;
  images: string[] | null;
}
interface SenderId {
  id: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  lastLogout?: any;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface GetChatUserList {
  id: number;
  last_msg: {
    message: string | null;
    images: string[] | null;
  };
  isRead: boolean;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
  isOnline?: boolean;
  last_msg_time: string;
  images: string[];
  receiverId: ReceiverId;
  senderId: ReceiverId;
  name: string;
  email: string;
  count: number;
  role?: number;
}
interface ReceiverId {
  id: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  lastLogout?: any;
  deletedAt?: any;
  createdAt: string;
  updatedAt: string;
}
