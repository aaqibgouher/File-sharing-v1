import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../utils/common";
import { getShareFileInfoByIdApiHelper } from "../../../../apiHelper/files";
import { getMeAuthState } from "../../../../store/slices/authSlice";

const SharedFileViewComponent = () => {
  const { fileId } = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const authUserInfoState = useSelector(getMeAuthState);
  const [myAccess, setAccess] = useState("");

  const getFileById = async () => {
    try {
      const res = await getShareFileInfoByIdApiHelper(fileId);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // set files
      const fileInfo = res?.data?.response;

      const myAccessInfo = fileInfo?.shared_with?.find(
        (shared) => shared?.user === authUserInfoState?._id
      );

      setFile(fileInfo);
      setAccess(myAccessInfo?.type || "VIEW");
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

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
        </div>

        {/* File Info */}
        <div className="row">
          {/* File Details (col-8) */}
          <div className="col-8">
            {file ? (
              <div>
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
                      <p>Type: {myAccess}</p>
                    </div>
                  </div>
                </div>
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
    </>
  );
};

export default SharedFileViewComponent;
