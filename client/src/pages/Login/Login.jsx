import React from "react";
import "./Login.css";
import LoginCover from "../../assets/images/login.png";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/schema";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/loginAction";
import { ActionTypes } from "../../redux/constants/actionTypes";
import { toast, Toaster } from 'react-hot-toast';

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLoginData = useSelector((state) => state.loginReducer.loginData);
  console.log(userLoginData);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log(values);
        const Email = values.email;
        const Password = values.password;

        loginApi(Email, Password)
          .then((result) => {
            console.log("result", result.data);
            dispatch(userLogin(result.data)).then(() => {
              toast.success("Logged in successfully 🎉😀");
              setTimeout(() => {
              navigate("/");
              },1500)
            });
          })
          .catch((err) => {
            console.log("err in log", err.response.data);
            toast.error(err.response.data);
            dispatch({
              type: ActionTypes.LOGIN_FAILED,
              payload: err.response.data,
            });
          });
        action.resetForm();
      },
    });
  return (
    <div className="login-main">
       <Toaster />
      <div className="left-div">
        <img src={LoginCover} alt="" />
      </div>
      <div className="right-div">
        <div className="form-div">
          <h1>Login to your account!</h1>
          <form onSubmit={handleSubmit}>
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
            <div className="login-btn">
              <button type="submit">Login</button>
            </div>
            <div className="options">
              <p className="acc-register">
                Don't have an account?
                <span
                  onClick={(e) => {
                    navigate("/register");
                  }}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
