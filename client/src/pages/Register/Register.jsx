import React, { useEffect } from "react";
import "./Register.css";
import RegisterCover from "../../assets/images/register.png";
import { useFormik } from "formik";
import { registerSchema } from "../../schema/schema";
import { registerApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

const initialValues = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegisterData = useSelector(
    (state) => state.registerReducer.registerData
  );
  console.log("userRegData", userRegisterData);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        const Name = values.name;
        const Email = values.email;
        const Mobile = values.mobile;
        const Password = values.password;
        registerApi(Name, Email, Mobile, Password).then((result) => {
          console.log("result", result.data);
          dispatch(userRegister(result)).then(() => {
            toast.success("Account registered successfully🎉😀");
            setTimeout(() => {
            navigate("/login");
            },1500)
          });
        });
        action.resetForm();
      },
    });

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/register");
    }
  }, []);

  return (
    <div className="register-main">
       <Toaster />
      <div className="image-div">
        <img src={RegisterCover} alt="" />
      </div>
      <div className="right-div">
        <div className="form-div">
          <h1>Register Your Account!</h1>
          <form onSubmit={handleSubmit}>
            <div
              className={`inp-div ${
                errors.name && touched.name ? "error" : ""
              }`}
            >
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null}
            </div>
            <div
              className={`inp-div ${
                errors.email && touched.email ? "error" : ""
              }`}
            >
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div
              className={`inp-div ${
                errors.email && touched.email ? "error" : ""
              }`}
            >
              <label htmlFor="">Mobile</label>
              <input
                type="text"
                name="mobile"
                id=""
                placeholder="Enter your mobile no"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.mobile && touched.mobile ? (
                <p className="form-error">{errors.mobile}</p>
              ) : null}
            </div>
            <div
              className={`inp-div ${
                errors.password && touched.password ? "error" : ""
              }`}
            >
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                id=""
                placeholder="Enter Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div
              className={`inp-div ${
                errors.confirmPassword && touched.confirmPassword ? "error" : ""
              }`}
            >
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id=""
                placeholder="Enter your password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="form-error">{errors.confirmPassword}</p>
              ) : null}
            </div>
            <div className="register-btn">
              {/* <p ty>Register</p> */}
              <button type="submit">Register</button>
            </div>
          </form>
          <p className="have-account">
            Already have an account?{" "}
            <span
              onClick={(e) => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
