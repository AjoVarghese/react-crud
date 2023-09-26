import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3001/api/user" });

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const user = JSON.parse(localStorage.getItem("userInfo"));

export const registerApi = (Name, Email, Mobile, Password) => {
  return API.post("/register", { Name, Email, Mobile, Password }, config);
};

export const loginApi = (Email, Password) => {
  return API.post("/login", { Email, Password }, config);
};

export const imageUploadApi = (Id, Image) => {
  return API.post("/image-upload", { Id, Image }, config);
};

export const editProfileApi = (Name, Email, Mobile, userId) => {
  return API.post(
    "/edit-profile?id=" + userId,
    { Name, Email, Mobile, userId },
    config
  );
};

export const changePasswordApi = (CurrentPassword, NewPassword, userId) => {
  console.log(CurrentPassword,NewPassword);
  return API.post(
    "/change-password?id=" + userId,
    { CurrentPassword, NewPassword, userId },
    config
  );
};

export const addAddressApi = ( Street, City, State, Country, Pincode, userId) => {
  return API.post("/add-address?id="+userId, { Street, City, State, Country, Pincode}, config)
}

export const getAddressApi = (userId) => {
  return API.get("/get-address?id="+userId, config)
}


export const deleteAddressApi = (addressId,userId) => {
  const queryParams = {
    addressId: addressId,
    userId: userId
  };
  return API.get("/delete-address",{queryParams},config)
}