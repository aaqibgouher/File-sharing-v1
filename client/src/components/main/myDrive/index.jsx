import { NavLink } from "react-router-dom";
import FileListComponent from "./filesList";
import { useEffect, useState } from "react";
import { getFilesApiHelper } from "../../../apiHelper/files";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyDriveFilesFileState,
  updateMyDriveFiles,
} from "../../../store/slices/fileSlice";

const MyDriveMainComponent = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const myDriveFilesState = useSelector(getMyDriveFilesFileState);

  const getFiles = async () => {
    try {
      const res = await getFilesApiHelper();

      if (!res || res?.status !== 200) throw "Something went wrong";

      // set files
      await dispatch(updateMyDriveFiles(res?.data?.response) || []);
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    setFiles(myDriveFilesState);
  }, [myDriveFilesState]);

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
          <div>My Drive</div>
          <NavLink to="/my-drive/upload">
            <button
              className="btn"
              style={{ backgroundColor: "#6863f2", color: "white" }}
            >
              Upload
            </button>
          </NavLink>
        </div>

        {/* Files */}
        <FileListComponent files={files} />
      </div>
    </>
  );
};

export default MyDriveMainComponent;
