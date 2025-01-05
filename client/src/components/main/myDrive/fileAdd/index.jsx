import { useState } from "react";
import { uploadFileApiHelper } from "../../../../apiHelper/files";
import { useNavigate } from "react-router-dom";

const FileAddComponent = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    // creating form data
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFileApiHelper(formData);

      if (!res || res.status !== 200) "Something went wrong";

      // navigate to my drives
      setTimeout(() => {
        navigate("/my-drive");
      }, 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
  };

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
          <div>Upload file</div>
        </div>

        {/* File Upload */}
        <div className="row">
          <div className="col-6">
            <div className="card" style={{ height: "200px" }}>
              <div
                className="card-body d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{}}
                >
                  {/* You can use an icon here, like a file icon or a thumbnail */}
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn mt-3"
              style={{ backgroundColor: "#6863f2", color: "white" }}
              onClick={uploadFile}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileAddComponent;
