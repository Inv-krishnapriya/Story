export interface IChatHistory {
  pages: IChatHistoryPages;
  details: IChatItem[];
}
export interface IChatHistoryPages {
  pageSize: number;
  totalPages: number;
  currentPage: number;
}

export interface IChatItem {
  messageId: string[];
  datetime: string;
  senderId: string;
  hasFile?: boolean;
  messageType: number;
  files: IChatItemFile[];
  message: string;
  status: number;
  id: string;
}

export interface IChatItemFile {
  fileId: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  hasPreview: boolean;
}
