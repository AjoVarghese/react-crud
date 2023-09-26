import axios from "axios";
const API = axios.create({ baseURL: "https://react-crud-muds.onrender.com/api/user" });

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const user = JSON.parse(localStorage.getItem("userInfo"));
console.log('API user token',user?.token);

const configToken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + " " + user?.token,
  },
};

export const registerApi = (Name, Email, Mobile, Password) => {
  return API.post("/register", { Name, Email, Mobile, Password }, config);
};

export const loginApi = (Email, Password) => {
  return API.post("/login", { Email, Password }, config);
};

export const imageUploadApi = (Id, Image) => {
  return API.post("/image-upload", { Id, Image }, configToken);
};

export const editProfileApi = (Name, Email, Mobile, userId) => {
  return API.post(
    "/edit-profile?id=" + userId,
    { Name, Email, Mobile, userId },
    configToken
  );
};

export const changePasswordApi = (CurrentPassword, NewPassword, userId) => {
  console.log(CurrentPassword,NewPassword);
  return API.post(
    "/change-password?id=" + userId,
    { CurrentPassword, NewPassword, userId },
    configToken
  );
};

export const addAddressApi = ( Street, City, State, Country, Pincode, userId) => {
  return API.post("/add-address?id="+userId, { Street, City, State, Country, Pincode}, configToken)
}

export const getAddressApi = (userId) => {
  return API.get("/get-address?id="+userId, configToken)
}


export const deleteAddressApi = (addressId,userId) => {
  return API.post(`/delete-address?addressId=${addressId}&userId=${userId}`,configToken)
}