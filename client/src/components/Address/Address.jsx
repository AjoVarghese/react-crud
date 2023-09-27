import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBInput,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
} from "mdb-react-ui-kit";
import { toast, Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import ModalBox from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAddressApi } from "../../api/api";
import { deleteAddressAction, getAddressAction } from "../../redux/actions/addressAction";

function Address({ userId }) {
  const userAddress = JSON.parse(localStorage.getItem("userInfo"))?.Address;

  const addressData = useSelector((state) => state.addressReducer.addressData);
  const address = addressData?.Address;

  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModal(true);
  };


  useEffect(() => {
    dispatch(getAddressAction(userId));
  }, []);

  return (
    <div>
      <Toaster />
    <MDBRow className="mt-4">
      {address && address.length !== 0 ? (
        <MDBCol md="6">
          <MDBCard className="mb-4 mb-md-0">
            <MDBCardBody>
              <MDBCardText className="mb-4">
                <span className="text-primary font-italic me-1">Address</span>
              </MDBCardText>

              <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                Street
              </MDBCardText>
              <MDBInput
                label="Readonly"
                placeholder="Readonly input here..."
                id="formControlReadOnly"
                type="text"
                defaultValue={address[0].Street}
                readOnly
              />

              <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                City
              </MDBCardText>
              <MDBInput
                label="Readonly"
                placeholder="Readonly input here..."
                id="formControlReadOnly"
                type="text"
                defaultValue={address[0].City}
                readOnly
              />

              <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                State
              </MDBCardText>
              <MDBInput
                label="Readonly"
                placeholder="Readonly input here..."
                id="formControlReadOnly"
                type="text"
                defaultValue={address[0].State}
                readOnly
              />

              <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                Country
              </MDBCardText>
              <MDBInput
                label="Readonly"
                placeholder="Readonly input here..."
                id="formControlReadOnly"
                type="text"
                defaultValue={address[0].Country}
                readOnly
              />

              <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                Pincode
              </MDBCardText>
              <MDBInput
                label="Readonly"
                
                id="formControlReadOnly"
                type="text"
                defaultValue={address[0].Pincode}
                readOnly
              />
              <hr />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ) : (
        <div className="col-md-12">
          <MDBCard>
            <MDBCardBody>
              <MDBCardText>No Address added?</MDBCardText>
              <MDBBtn onClick={toggleModal}>Add New Address</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </div>
      )}
    </MDBRow>

    {modal ? <ModalBox closeModal={setModal} userId={userId} /> : ""}
  </div>
  );
}

export default Address;
