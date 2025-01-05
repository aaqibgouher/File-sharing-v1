import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getFileByIdApiHelper } from "../../../../apiHelper/files";
import { formatDate } from "../../../../utils/common";
import FileShareComponent from "../fileShare";
import { getUsersApiHelper } from "../../../../apiHelper/users";
import { updateUsers } from "../../../../store/slices/authSlice";
import Toast from "../../../general/toast";

const FileViewComponent = () => {
  const { fileId } = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const getFileById = async () => {
    try {
      const res = await getFileByIdApiHelper(fileId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // set files
      setFile(res?.data?.response);
      console.log(res?.data?.response, "file ----");
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

  const getUsers = async () => {
    try {
      const res = await getUsersApiHelper({ role: "USER" });

      if (!res || res?.status !== 200) throw "Something went wrong";

      // save users
      await dispatch(updateUsers(res?.data?.response || []));
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    if (file?.signedUrl) {
      try {
        await navigator.clipboard.writeText(file.signedUrl);
        Toast.success("Link copied");
      } catch (error) {
        console.error("Failed to copy the link: ", error);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (fileId) {
      getFileById();
    }
  }, [fileId]);

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
          <div>View file</div>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Share
          </button>
        </div>

        {/* File Info */}
        <div className="row">
          {/* File Details (col-8) */}
          <div className="col-8">
            {file ? (
              <div>
                {/* File Info */}
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  File Info
                </p>

                <div className="container text-center">
                  <div className="row">
                    <div className="col text-start">
                      <p>Name: {file.name}</p>
                      <p>Encoding: {file.encoding}</p>
                      <p>Shared Status: {file.shared_status}</p>
                      <p>Created At: {formatDate(file.createdAt)}</p>
                    </div>
                    <div className="col text-start">
                      <p>Mime Type: {file.mimeType}</p>
                      <p>Size: {file.size}</p>
                      <p>Updated At: {formatDate(file.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Link Info */}
                {file?.shared_status === "OPEN" && (
                  <div>
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      Link Info
                    </p>

                    <div className="container text-center">
                      <div className="row">
                        <div className="col text-start">
                          <p>
                            Link:{" "}
                            <button onClick={copyToClipboard} className="btn">
                              Copy Link
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p>Loading file details...</p>
            )}
          </div>

          {/* File Preview (col-4) */}
          <div className="col-4">
            {file ? (
              <div className="card">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <div>
                    {/* Depending on file type, you can use the signed URL for different previews */}
                    {file?.mimeType.startsWith("image/") ? (
                      <img
                        src={file?.signedUrl}
                        alt={file?.name}
                        style={{ width: "100%", height: "250px" }}
                      />
                    ) : (
                      <p>Preview not available for this file type</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading file preview...</p>
            )}
          </div>
        </div>
      </div>

      <FileShareComponent file={file} setFile={setFile} />
    </>
  );
};

export default FileViewComponent;
