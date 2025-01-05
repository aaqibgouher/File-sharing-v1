import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApiHelper } from "../../../apiHelper/auth";
import { setData } from "../../../utils/common";
import { updateMe } from "../../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginAuthComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const login = async () => {
    try {
      const res = await loginApiHelper(formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // store user info to localstorage
      setData("userData", res?.data?.response);

      // update state
      await dispatch(updateMe(res?.data?.response));

      // redirect to dashboard
      navigate(`/`);
    } catch (error) {
      console.log("RegisterAuthComponent - Error", error);
    }
  };

  return (
    <>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-center">Login</h1>
        <small className="text-center color-light-grey">
          Enter following details to login yourself ...
        </small>

        <div className="mb-2 mt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="btn bg-dark-purple color-white mt-5"
          style={{ backgroundColor: "#6863f2", color: "white" }}
          onClick={login}
        >
          Submit
        </button>

        {/* Already have an account? */}
        <div className="text-center mt-3">
          <small>
            Create new account?{" "}
            <Link to="/register" className="color-dark-puple">
              Register here
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default LoginAuthComponent;
