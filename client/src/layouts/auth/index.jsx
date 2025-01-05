import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="bg-light-purple" style={{ minHeight: "100vh" }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
