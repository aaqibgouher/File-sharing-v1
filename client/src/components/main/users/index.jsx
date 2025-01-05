import { useEffect, useState } from "react";
import UsersListComponent from "./usersList";
import { getUsersApiHelper } from "../../../apiHelper/users";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersAuthState,
  updateUsers,
} from "../../../store/slices/authSlice";

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const usersAuthState = useSelector(getUsersAuthState);

  const getUsers = async () => {
    try {
      const res = await getUsersApiHelper({ role: "ADMIN" });

      if (!res || res?.status !== 200) throw "Something went wrong";

      // set files
      await dispatch(updateUsers(res?.data?.response) || []);
    } catch (error) {
      console.log("MyDriveMainComponent:getFiles - Error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setUsers(usersAuthState);
  }, [usersAuthState]);

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
          <div>Users</div>
        </div>

        {/* Files */}
        <UsersListComponent users={users} />
      </div>
    </>
  );
};

export default UsersComponent;
