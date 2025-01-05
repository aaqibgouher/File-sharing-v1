import { useEffect, useState } from "react";
import FileListComponent from "../myDrive/filesList";
import { useDispatch, useSelector } from "react-redux";
import {
  getSharedWithMeFileState,
  updateShareWithMeFiles,
} from "../../../store/slices/fileSlice";
import { getSharedWithMeFilesApiHelper } from "../../../apiHelper/files";
import SharedFileListComponent from "./sharedFilesList";

const SharedWithMeMainComponent = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const sharedWithMeFilesState = useSelector(getSharedWithMeFileState);

  const getFilesSharedWithMe = async () => {
    try {
      const res = await getSharedWithMeFilesApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      // set files
      await dispatch(updateShareWithMeFiles(res?.data?.response) || []);
    } catch (error) {
      console.log("SharedWithMeMainComponent:getFiles - Error", error);
    }
  };

  useEffect(() => {
    getFilesSharedWithMe();
  }, []);

  useEffect(() => {
    setFiles(sharedWithMeFilesState);
  }, [sharedWithMeFilesState]);

  return (
    <>
      <div className="container my-2">
        <div
          className="mb-5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          <div>Shared with me</div>
        </div>

        {/* Files */}
        <SharedFileListComponent files={files} />
      </div>
    </>
  );
};

export default SharedWithMeMainComponent;
