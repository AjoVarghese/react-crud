import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
 
} from "mdb-react-ui-kit";
import {useFormik} from "formik"
import { addressSchema } from "../../schema/schema";
import { addAddressApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addAddressAction } from "../../redux/actions/addressAction";

const initialValues = {
  streetName : "",
  city : "",
  state : "",
  country : "",
  pincode : ""
}

export default function ModalBox({ closeModal, userId }) {
  console.log('moda',userId);
  const [basicModal, setBasicModal] = useState(true);
  const dispatch = useDispatch()

  const userData = JSON.parse(localStorage.getItem("userInfo"))



  const {values,errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues:initialValues,
    validationSchema: addressSchema,
    onSubmit:(values,action) => {
      console.log('addre val',values);
    addAddressApi(values.streetName,values.city,values.state,values.country,values.pincode,userId).then((data) => {

      console.log('address data',data.data);
      dispatch(addAddressAction(data.data))
      closeModal(false);
      // userData.Address = data?.data.Address
      // localStorage.setItem('userInfo', JSON.stringify(userData));
      
    })
       
     action.resetForm()
    }
  })


  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add New Address🏠</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={(e) => {
                  closeModal(false);
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  className="mb-3"
                  type="text"
                  id="form1Example1"
                  label="Street Name"
                  name="streetName"
                value={values.streetName}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {
                  errors.streetName &&touched.streetName ? (
                     <p className='form-error'>{errors.streetName}</p>
                  ) : null
                }
                <MDBInput
                  className="mb-3"
                  type="text"
                  id="form1Example2"
                  label="City"
                  name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {
                  errors.city &&touched.city ? (
                     <p className='form-error'>{errors.city}</p>
                  ) : null
                }
                <MDBInput
                  className="mb-3"
                  type="text"
                  id="form1Example2"
                  label="State"
                  name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {
                  errors.state &&touched.state ? (
                     <p className='form-error'>{errors.state}</p>
                  ) : null
                }
                <MDBInput
                  className="mb-3"
                  type="text"
                  id="form1Example2"
                  label="Country"
                  name="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {
                  errors.country &&touched.country ? (
                     <p className='form-error'>{errors.country}</p>
                  ) : null
                }
                <MDBInput
                  className="mb-3"
                  type="text"
                  id="form1Example2"
                  label="Pincode"
                  name="pincode"
                value={values.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                    {
                  errors.pincode &&touched.pincode ? (
                     <p className='form-error'>{errors.pincode}</p>
                  ) : null
                }
                <MDBModalFooter>
                  <MDBBtn
                    color="secondary"
                    onClick={(e) => {
                      closeModal(false);
                    }}
                  >
                    Close
                  </MDBBtn>
                  <MDBBtn type="submit">Save changes</MDBBtn>
                </MDBModalFooter>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
