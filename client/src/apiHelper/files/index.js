import { apiRequest } from "..";
import {
  FILES_ADD_FILE,
  FILES_GET_FILE,
  FILES_GET_FILES,
  FILES_GET_SHARED_FILE,
  FILES_GET_SHARED_FILES,
  FILES_SHARE_FILE,
} from "../../utils/constant";

export const getFilesApiHelper = async (payload) => {
  return await apiRequest({
    url: `files?accessId=${FILES_GET_FILES}`,
    method: "GET",
  });
};

export const uploadFileApiHelper = async (payload) => {
  return await apiRequest({
    url: `files?accessId=${FILES_ADD_FILE}`,
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFileByIdApiHelper = async (fileId) => {
  return await apiRequest({
    url: `files/${fileId}?accessId=${FILES_GET_FILE}`,
    method: "GET",
  });
};

export const shareFileToUsersApiHelper = async (fileId, payload) => {
  return await apiRequest({
    url: `files/${fileId}/share?accessId=${FILES_SHARE_FILE}`,
    method: "POST",
    data: payload,
  });
};

export const getSharedWithMeFilesApiHelper = async (payload) => {
  return await apiRequest({
    url: `files/shared?accessId=${FILES_GET_SHARED_FILES}`,
    method: "GET",
  });
};

export const getShareFileInfoByIdApiHelper = async (fileId) => {
  return await apiRequest({
    url: `files/${fileId}/share?accessId=${FILES_GET_SHARED_FILE}`,
    method: "GET",
  });
};
