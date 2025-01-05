import SharedFilesListItemComponent from "./sharedFilesListItem";

const SharedFileListComponent = ({ files }) => {
  return (
    <>
      <div className="row">
        {files?.length ? (
          files.map((file) => (
            <SharedFilesListItemComponent file={file} key={file?._id} />
          ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%", minHeight: "300px" }}
          >
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1735834341~exp=1735837941~hmac=b6d1fb7a6995ba0c925758d9479c3fc674074b71a3a166be86abf922230291b9&w=1060"
              alt="No files"
              style={{ height: "500px", width: "500px" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SharedFileListComponent;
