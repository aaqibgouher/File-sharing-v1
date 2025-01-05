import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LogoComponent from "../../general/logo";
import { useState } from "react";
import { verifyEmailApiHelper } from "../../../apiHelper/auth";
import { useDispatch } from "react-redux";
import { updateMe } from "../../../store/slices/authSlice";
import { setData } from "../../../utils/common";

const VerifyEmailAuthComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const email = searchParams.get("email");
  const [formData, setFormData] = useState({
    email,
    otp: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const verifyEmail = async () => {
    try {
      const res = await verifyEmailApiHelper(formData);

      if (!res || res?.status !== 200) throw "Something went wrong";

      // store user info to localstorage
      setData("userData", res?.data?.response);

      // update state
      await dispatch(updateMe(res?.data?.response));

      // redirect to dashboard
      navigate(`/`);
    } catch (error) {
      console.log("VerifyEmailAuthComponent - Error", error);
    }
  };

  return (
    <>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-center">Verify Email</h1>
        <small className="text-center color-light-grey">
          Enter following details to verify yourself ...
        </small>

        <div className="mb-2 mt-5">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="mb-2">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            OTP
          </label>
          <input
            type="text"
            className="form-control"
            id="otp"
            value={formData.otp}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="btn bg-dark-purple color-white mt-5"
          style={{ backgroundColor: "#6863f2", color: "white" }}
          onClick={verifyEmail}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default VerifyEmailAuthComponent;
