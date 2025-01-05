import { Link, useNavigate } from "react-router-dom";
import LogoComponent from "../../general/logo";
import { useState } from "react";
import { registerApiHelper } from "../../../apiHelper/auth";

const RegisterAuthComponent = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.checked ? "ADMIN" : "USER",
    }));
  };

  const register = async () => {
    try {
      const res = await registerApiHelper(formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // redirect to dashboard
      navigate(`/verify-email?email=${formData.email}`);
    } catch (error) {
      console.log("RegisterAuthComponent - Error", error);
    }
  };

  return (
    <>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-center">Register</h1>
        <small className="text-center color-light-grey">
          Enter following details to register yourself ...
        </small>

        <div className="mb-2 mt-5">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="exampleFormControlInput2" className="form-label">
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
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isAdmin"
              checked={isAdmin}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="isAdmin">
              Register as Admin
            </label>
          </div>
        </div>

        <button
          type="button"
          className="btn bg-dark-purple color-white mt-5"
          style={{ backgroundColor: "#6863f2", color: "white" }}
          onClick={register}
        >
          Submit
        </button>

        {/* Already have an account? */}
        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="color-dark-puple">
              Login here
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default RegisterAuthComponent;
