import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsersAuthState } from "../../../../store/slices/authSlice";
import { shareFileToUsersApiHelper } from "../../../../apiHelper/files";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const FileShareComponent = ({ file, setFile }) => {
  const usersAuthState = useSelector(getUsersAuthState);
  const [generalAccess, setGeneralAccess] = useState();
  const [peopleWithAccess, setPeopleWithAccess] = useState([]);

  useEffect(() => {
    if (usersAuthState?.length && file) {
      const updatedAccessList = usersAuthState.map((user) => {
        const sharedUser = file?.shared_with.find(
          (shared) => shared.user === user._id
        );

        return {
          id: user._id,
          name: user.name,
          avatar:
            "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
          email: user.email,
          access: sharedUser ? sharedUser.type || "VIEW" : "",
          isSelected: !!sharedUser,
        };
      });

      setPeopleWithAccess(updatedAccessList);
      setGeneralAccess(file?.shared_status || "OPEN");
    }
  }, [usersAuthState, file]);

  const handleAccessChange = (personId, newAccess) => {
    setPeopleWithAccess((prev) =>
      prev.map((person) =>
        person.id === personId ? { ...person, access: newAccess } : person
      )
    );
  };

  const handleSelectionChange = (personId, isSelected) => {
    setPeopleWithAccess((prev) =>
      prev.map((person) =>
        person.id === personId ? { ...person, isSelected } : person
      )
    );
  };

  const handleSubmit = async () => {
    const sharedWith = peopleWithAccess
      .filter((person) => person.isSelected)
      .map((person) => ({
        user: person.id,
        type: person.access || "VIEW",
      }));

    const payload = {
      sharedStatus: generalAccess,
    };

    if (generalAccess === "OPEN") {
      payload.sharedWith = [];
    } else {
      payload.sharedWith = sharedWith;
    }

    try {
      const res = await shareFileToUsersApiHelper(file._id, payload);

      if (!res || res?.status !== 200) throw "Something went wrong";

      //   update file detail
      setFile(res?.data?.response);

      //   close modal
      // Close the modal
      const modalElement = document.getElementById("exampleModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) modalInstance.hide();
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Share File
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* People with Access */}
              <div>
                <small>People with Access</small>
                <ul className="list-group mt-1">
                  {peopleWithAccess.map((person) => (
                    <li
                      key={person.id}
                      className="list-group-item d-flex align-items-center justify-content-between"
                    >
                      {/* Avatar and Name */}
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="me-2"
                          checked={person.isSelected}
                          onChange={(e) =>
                            handleSelectionChange(person.id, e.target.checked)
                          }
                        />
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="rounded-circle me-2"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <span>{person.name}</span>
                      </div>

                      {/* Access Type */}
                      <select
                        className="form-select"
                        value={person.access || "VIEW"}
                        onChange={(e) =>
                          handleAccessChange(person.id, e.target.value)
                        }
                        disabled={!person.isSelected}
                        style={{ width: "120px", border: "none" }}
                      >
                        <option value="VIEW">View</option>
                        <option value="DOWNLOAD">Download</option>
                      </select>
                    </li>
                  ))}
                </ul>
              </div>

              {/* General Access */}
              <div className="mt-4">
                <small>General Access</small>
                <select
                  className="form-select"
                  value={generalAccess}
                  onChange={(e) => setGeneralAccess(e.target.value)}
                >
                  <option value="OPEN">Open</option>
                  <option value="RESTRICTED">Restricted</option>
                </select>
                <small className="text-muted">
                  {generalAccess === "OPEN"
                    ? "Open: Anyone with the link can access."
                    : "Restricted: Only people with access can view."}
                </small>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn"
                  style={{ backgroundColor: "#6863f2", color: "white" }}
                  onClick={handleSubmit}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileShareComponent;
