import { NavLink } from "react-router-dom";

const SharedFilesListItemComponent = ({ file }) => {
  return (
    <div className="col-md-3 col-sm-4 mb-4">
      <NavLink to={`/shared-with-me/${file._id}`}>
        <div
          className="card file-item"
          style={{
            height: "200px",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
          }}
        >
          <div
            className="card-body d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div
              className="d-flex justify-content-center align-items-center file-icon"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#eeeef9",
                borderRadius: "8px",
                transition: "background-color 0.2s ease",
              }}
            >
              {/* You can use an icon here, like a file icon or a thumbnail */}
              <i
                className="bi bi-file-earmark-pdf"
                style={{ fontSize: "2rem", color: "#6863f2" }}
              ></i>
            </div>
            <h5 className="mt-2 text-center text-truncate" title={file.name}>
              {file.name}
            </h5>
            <small>Shared by: {file?.user?.name}</small>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SharedFilesListItemComponent;
