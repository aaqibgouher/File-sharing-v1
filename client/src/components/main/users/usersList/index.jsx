import React from "react";
import "./style.css"; // Ensure that the correct path is used
import UsersListItemComponent from "./usersListItem";

const UsersListComponent = ({ users }) => {
  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Registered</th>
            <th scope="col">Otp Verified</th>
            <th scope="col">Role</th>
            <th scope="col">Created On</th>
            <th scope="col">Updated On</th>
          </tr>
        </thead>
        <tbody>
          {users?.length ? (
            users.map((user, index) => (
              <UsersListItemComponent user={user} index={index} key={index} />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default UsersListComponent;
