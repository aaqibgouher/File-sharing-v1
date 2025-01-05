import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myDriveFiles: [],
  sharedWithMe: [],
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    updateMyDriveFiles: (state, action) => {
      state.myDriveFiles = action.payload;
    },
    updateShareWithMeFiles: (state, action) => {
      state.sharedWithMe = action.payload;
    },
  },
});

// Action
export const { updateMyDriveFiles, updateShareWithMeFiles } = fileSlice.actions;

// Getters
export const getMyDriveFilesFileState = (state) => state.files.myDriveFiles;
export const getSharedWithMeFileState = (state) => state.files.sharedWithMe;

export default fileSlice.reducer;
