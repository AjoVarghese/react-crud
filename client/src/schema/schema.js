import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registerSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  mobile: Yup.string()
  .matches(/^\d{10}$/, "Mobile number must be 10 digits")
  .required("Please enter your mobile number"),
  password: Yup.string().min(6).max(12).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});


export const loginSchema = Yup.object({
  email : Yup.string().email().required("Please enter your email"),
  password : Yup.string().min(6).max(12).required("Please enter your password")
})

export const editSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
})

export const changePasswordSchema = Yup.object({
  currentPassword : Yup.string().min(6).max(12).required("Please enter your current password"),
  newPassword: Yup.string().min(6).max(12).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
})

export const profileEditSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  mobile: Yup.string()
  .matches(/^\d{10}$/, "Mobile number must be 10 digits")
  .required("Please enter your mobile number")
})

export const addressSchema = Yup.object({
  streetName : Yup.string().min(3).max(25).required("Please enter your street"),
  city : Yup.string().min(3).max(25).required("Please enter your city"),
  state : Yup.string().min(3).max(25).required("Please enter your state"),
  country : Yup.string().min(3).max(25).required("Please enter your country"),
  pincode : Yup.string()
  .matches(/^\d{6}$/, "Mobile number must be 6 digits")
  .required("Please enter your mobile number")
})