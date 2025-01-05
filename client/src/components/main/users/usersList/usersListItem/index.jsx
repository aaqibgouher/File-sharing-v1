import { formatDate } from "../../../../../utils/common";

const UsersListItemComponent = ({ user, index }) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.is_registered ? "Yes" : "No"}</td>
      <td>{user.is_otp_verified ? "Yes" : "No"}</td>
      <td>{user.role}</td>
      <td>{formatDate(user.createdAt)}</td>
      <td>{formatDate(user.updatedAt)}</td>
    </tr>
  );
};

export default UsersListItemComponent;
