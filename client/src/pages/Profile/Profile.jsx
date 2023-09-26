import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import {
  changePasswordApi,
  editProfileApi,
  imageUploadApi,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfileAction,
  imageUpload,
} from "../../redux/actions/profileAction";
import { useFormik } from "formik";
import { changePasswordSchema, profileEditSchema } from "../../schema/schema";
import { toast, Toaster } from "react-hot-toast";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { MDBAccordion } from "mdb-react-ui-kit";
import Address from "../../components/Address/Address";

const changePasswordInitialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ProfilePage() {
  const [image, setImage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAccordionVisible, setAccordionVisible] = useState(false);
  const [buttonText, setButtonText] = useState("Change Password");

  const handleAccordion = () => {
    if (isAccordionVisible) {
      setAccordionVisible(false);
      setButtonText("Change Password");
    } else {
      setAccordionVisible(true);
      setButtonText("Cancel");
    }
  };

  const buttonStyles = {
    backgroundColor: buttonText === "Cancel" ? "red" : "", // Text color
  };

  const profileImage = useSelector(
    (state) => state.imageUploadReducer.imageData
  );
  console.log("PofileImage", profileImage);
  const profileDetails = useSelector(
    (state) => state.editProfileReducer.profileData
  );
  console.log("profile detaisl", profileDetails);

  const userData = JSON.parse(localStorage.getItem("userInfo"));

  const profileImageFromStorage = JSON.parse(
    localStorage.getItem("userInfo")
  )?.ProfileImage;

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData]);

  //change DP
  const handleClick = (e) => {
    setUpdating(true);
    console.log("img upload");
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "u9xwnqfv");
    formData.append("cloud_name", "dhvdw5m2w");
    fetch(`https://api.cloudinary.com/v1_1/dhvdw5m2w/image/upload`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("cloud err", err);
      })
      .then((data) => {
        console.log("image dataa url", data.secure_url);
        const imageUrl = data.secure_url;
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        userData.ProfileImage = imageUrl;
        localStorage.setItem("userInfo", JSON.stringify(userData));

        imageUploadApi(userData.id, data.secure_url)
          .then((result) => {
            console.log("resulttttttt", result.data);

            dispatch(imageUpload(result.data));
            toast("Profile Image updated scuccessfully  😀");
            setImage("");
            setUpdating(false);
            
          })
          .catch((err) => {
            console.log("err in image upload", err);
            toast("Error while updating profile image  ☹️");
            setImage("");
            setUpdating(false);
          });
      })
      .catch((err) => {
        console.log("clouddd err", err);
        toast("Error while updating profile image ☹️");
            setImage("");
            setUpdating(false);
      });
  };

  const changePasswordFormik = useFormik({
    initialValues: changePasswordInitialValues,
    validationSchema: changePasswordSchema,
    onSubmit: (values, action) => {
      const CurrentPassword = values.currentPassword;
      const NewPassword = values.newPassword;
      changePasswordApi(CurrentPassword, NewPassword, userData?.id)
        .then((data) => {
          console.log("chg pwd data", data);
          toast.success(data.data);
          setAccordionVisible(false);
          setButtonText("Change Password");
        })
        .catch((err) => {
          console.log("chg pwd err", err);
          toast.error(err.response.data);
          setAccordionVisible(true);
          setButtonText("Cancel");
        });

      action.resetForm();
    },
  });

  const profileInitialValues = {
    name: userData?.Name,
    email: userData?.Email,
    mobile: userData?.Mobile,
  };

  const profileFormik = useFormik({
   
    
    initialValues: profileInitialValues,
    validationSchema: profileEditSchema,
    
    onSubmit: (values, action) => {
      setEditing(true)
      console.log("edit values", values);
      editProfileApi(values.name, values.email, values.mobile, userData.id)
        .then((result) => {
          console.log("updated profile data", result.data);
          
          const localStorageData = JSON.parse(localStorage.getItem("userInfo"));

          localStorageData.Name = result.data.Name;
          localStorageData.Email = result.data.Email;
          localStorageData.Mobile = result.data.Mobile;

          localStorage.setItem("userInfo", JSON.stringify(localStorageData));
          dispatch(editProfileAction(result.data));
          toast.success("Profile updated successfully😃");
          setEditing(false)
          setEditProfile(false);
        })
        .catch((err) => {
          toast.success("Profile not updated☹️");
          

        });
    },
  });

  return (
    <section style={{ backgroundColor: "#DBF3FA",height:'120vh'}}>
      <Navbar />
      <Toaster />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={
                    profileImageFromStorage
                      ? profileImageFromStorage
                      : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <input
                  className="mb-2 mt-4"
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  id="fileInput"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <div className="d-flex justify-content-center mb-2 ">
                  {updating ? (
                    <MDBBtn disabled>
                      <MDBSpinner
                        grow
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                      />
                      Loading...
                    </MDBBtn>
                  ) : image ? (
                    <MDBBtn onClick={handleClick}>Change DP</MDBBtn>
                  ) : (
                    <MDBBtn disabled>Change DP</MDBBtn>
                  )}
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 text-left">
              <MDBCardBody>
                <MDBRow>
                  {/* <MDBCol sm="12"> */}
                  <MDBCardText>Change Password</MDBCardText>

                  <MDBBtn onClick={handleAccordion} style={buttonStyles}>
                    {buttonText}
                  </MDBBtn>
                </MDBRow>
                <MDBRow className="mt-4">
                  {isAccordionVisible && (
                    <MDBAccordion initialActive={1} className="mt-6">
                      <form onSubmit={changePasswordFormik.handleSubmit}>
                        <MDBCard>
                          <MDBCardBody className="text-left">
                            <MDBRow className="md-4 mb-3">
                              <label
                                htmlFor=""
                                className="mb-2"
                                style={{ textAlign: "left" }}
                              >
                                Current Password
                              </label>
                              <MDBInput
                                label="Current Password"
                                id="form1"
                                type="text"
                                name="currentPassword"
                                value={
                                  changePasswordFormik.values.currentPassword
                                }
                                onChange={changePasswordFormik.handleChange}
                                onBlur={changePasswordFormik.handleBlur}
                              />
                              {changePasswordFormik.errors.currentPassword &&
                              changePasswordFormik.touched.currentPassword ? (
                                <p
                                  className="form-error"
                                  style={{ textAlign: "left", color: "red" }}
                                >
                                  {changePasswordFormik.errors.currentPassword}
                                </p>
                              ) : null}
                            </MDBRow>
                            <MDBRow className="md-4 mb-3">
                              <label
                                htmlFor=""
                                className="mb-2"
                                style={{ textAlign: "left" }}
                              >
                                New Password
                              </label>
                              <MDBInput
                                label="New Password"
                                id="form1"
                                type="text"
                                name="newPassword"
                                value={changePasswordFormik.values.newPassword}
                                onChange={changePasswordFormik.handleChange}
                                onBlur={changePasswordFormik.handleBlur}
                              />
                              {changePasswordFormik.errors.newPassword &&
                              changePasswordFormik.touched.newPassword ? (
                                <p
                                  className="form-error"
                                  style={{ textAlign: "left", color: "red" }}
                                >
                                  {changePasswordFormik.errors.newPassword}
                                </p>
                              ) : null}
                            </MDBRow>
                            <MDBRow className="md-4 mb-3">
                              <label
                                htmlFor=""
                                className="mb-2"
                                style={{ textAlign: "left" }}
                              >
                                Confirm Password
                              </label>
                              <MDBInput
                                label="Confirm New Password"
                                id="form1"
                                type="text"
                                name="confirmPassword"
                                value={
                                  changePasswordFormik.values.confirmPassword
                                }
                                onChange={changePasswordFormik.handleChange}
                                onBlur={changePasswordFormik.handleBlur}
                              />
                              {changePasswordFormik.errors.confirmPassword &&
                              changePasswordFormik.touched.confirmPassword ? (
                                <p
                                  className="form-error"
                                  style={{ textAlign: "left", color: "red" }}
                                >
                                  {changePasswordFormik.errors.confirmPassword}
                                </p>
                              ) : null}
                            </MDBRow>
                            <MDBBtn className="mt-4" type="submit">
                              Change Password
                            </MDBBtn>
                          </MDBCardBody>
                        </MDBCard>
                      </form>
                    </MDBAccordion>
                  )}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            {!editProfile ? (
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userData?.Name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userData?.Email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userData?.Mobile}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  
                    <MDBBtn
                    className="mt-4"
                    onClick={(e) => {
                      setEditProfile(true);
                    }}
                  >
                    Edit Profile
                  </MDBBtn>
                  
                  
                </MDBCardBody>
              </MDBCard>
            ) : (
              <MDBCard>
                <form onSubmit={profileFormik.handleSubmit}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <input
                          type="text"
                          id="fullNameInput"
                          class="form-control"
                          name="name"
                          defaultValue={profileFormik.values.name}
                          onBlur={profileFormik.handleBlur}
                          onChange={profileFormik.handleChange}
                        />
                        {profileFormik.errors.name &&
                          profileFormik.touched.name && (
                            <p className="form-error" style={{ textAlign: "left", color: "red" }}>
                              {profileFormik.errors.name}
                            </p>
                          )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText>
                          <input
                            type="text"
                            id="emailInput"
                            class="form-control"
                            name="email"
                            defaultValue={profileFormik.values.email}
                            onBlur={profileFormik.handleBlur}
                            onChange={profileFormik.handleChange}
                          />
                          {profileFormik.errors.email &&
                            profileFormik.touched.email  && (
                              <p className="form-error" style={{ textAlign: "left", color: "red" }}>
                                {profileFormik.errors.email}
                              </p>
                            )}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <input
                          type="text"
                          id="mobileInput"
                          class="form-control"
                          name="mobile"
                          defaultValue={profileFormik.values.mobile}
                          onBlur={profileFormik.handleBlur}
                          onChange={profileFormik.handleChange}
                        />
                        {profileFormik.errors.mobile &&
                          profileFormik.touched.mobile && (
                            <p className="form-error" style={{ textAlign: "left", color: "red" }}>
                              {profileFormik.errors.mobile}
                            </p>
                          )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBBtn
                      className="mt-4"
                      style={{ backgroundColor: "red" }}
                      onClick={(e) => {
                        setEditProfile(false);
                      }}
                    >
                      Cancel
                    </MDBBtn>
                    {
                      editing ? 
                      <MDBBtn disabled>
                      <MDBSpinner
                        grow
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                      />
                      Loading...
                    </MDBBtn> :
                      <MDBBtn
                      style={{ marginLeft: "2rem" }}
                      className="mt-4"
                      type="submit"
                    >
                      Save Changes
                    </MDBBtn>
                    }
                    
                  </MDBCardBody>
                </form>
              </MDBCard>
            )}
            <Address userId={userData?.id} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
