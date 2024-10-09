import { createSlice } from "@reduxjs/toolkit";
import { IChatHistoryPages, IChatItem } from "./interface";

interface Reducer {
  chatHistoryPagination: IChatHistoryPages;
  chatHistoryData: IChatItem[];
  pendingImageMessages: {
    messageId: string;
    fileId: string;
    failed: boolean;
  }[];
  pendingFileMessages: {
    messageId: string;
    fileId: string;
    failed: boolean;
  }[];
  hasPagination: boolean;
}

const initialState: Reducer = {
  chatHistoryPagination: { currentPage: 0, pageSize: 10, totalPages: 0 },
  chatHistoryData: [],
  pendingImageMessages: [],
  pendingFileMessages: [],
  hasPagination: true,
};

export const reducerSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatDocUploadRequest: (state, action) => {},
    chatDocUploadSuccess: (state, action) => {},
    chatDocUploadError: () => {},
    chatImageUploadRequest: (state, action) => {},
    chatImageUploadSuccess: (state, action) => {},
    chatImageUploadError: () => {},
    getChatHistoryRequest: (state, action) => {},
    getChatHistorySuccess: (state, action) => {
      state.chatHistoryData = initialState.chatHistoryData;
      state.chatHistoryPagination = action?.payload?.pages;
      state.chatHistoryData = [
        ...(action.payload?.details ?? []),
        ...state.chatHistoryData,
      ];
      console.log("reducer: ", state.chatHistoryData);
    },
    getChatHistoryError: () => {},
    removeChatHistoryData: (state) => {
      state.chatHistoryPagination = initialState.chatHistoryPagination;
      state.chatHistoryData = initialState.chatHistoryData;
    },
    setPendingImageMessages: (state, action) => {
      console.log("Set Pending image!!!!!!!!!!: ", action.payload);

      state.pendingImageMessages = [
        ...state.pendingImageMessages,
        action?.payload,
      ];
    },
    setPendingFileMessages: (state, action) => {
      console.log("Set files: ", action.payload);

      state.pendingFileMessages = [
        ...state.pendingFileMessages,
        action.payload,
      ];
    },
    removePendingImageMessages: (state, action) => {
      console.log("Called ******************", action.payload);

      const { messageId, fileId } = action.payload;
      const updatedData = state.pendingImageMessages.filter(
        (file) => !(file.messageId === messageId && file.fileId === fileId)
      );

      state.pendingImageMessages = updatedData;
    },
    removePendingFileMessages: (state, action) => {
      console.log("Removed files :", action.payload);

      const { messageId, fileId } = action.payload;
      const updatedPendingFiles = state?.pendingFileMessages?.filter(
        (file) => !(file.messageId === messageId && file.fileId === fileId)
      );

      state.pendingFileMessages = updatedPendingFiles;
    },
    changePendingImagesErrorStatus: (state, action) => {
      const { messageId, fileId } = action.payload;
      const updatedData = state.pendingImageMessages.map((item) => {
        if (item.messageId === messageId && item.fileId === fileId) {
          return { ...item, failed: true };
        }
        return item;
      });
      state.pendingImageMessages = updatedData;
    },
    changePendingFilesErrorStatus: (state, action) => {
      const { messageId, fileId } = action.payload;
      const updatedData = state.pendingFileMessages.map((item) => {
        if (item.messageId === messageId && item.fileId === fileId) {
          return { ...item, failed: true };
        }
        return item;
      });
      state.pendingFileMessages = updatedData;
    },
    changeHasPagination: (state, action) => {
      state.hasPagination = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = reducerSlice;
export { actions };
export default reducer;
