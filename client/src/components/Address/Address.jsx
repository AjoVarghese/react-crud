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
import React, { useEffect, useState } from "react";
import ModalBox from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAddressApi } from "../../api/api";
import { getAddressAction } from "../../redux/actions/addressAction";

function Address({ userId }) {
  const userAddress = JSON.parse(localStorage.getItem("userInfo"))?.Address;
  console.log(userAddress, "fdcf");

  const addressData = useSelector((state) => state.addressReducer.addressData);
  console.log("addressData selector", addressData?.Address);
  const address = addressData?.Address;
  console.log('ADDRESS',address?.length);

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
      {address?.length > 0 || address ? (
        <MDBRow>
          {address.map((address, i) => (
            <>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Address
                      </span>{" "}
                      {/* Project Status */}
                    </MDBCardText>
                    <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                      Street
                    </MDBCardText>
                    <MDBInput
                      label="Readonly"
                      placeholder="Readonly input here..."
                      id="formControlReadOnly"
                      type="text"
                      defaultValue={address.Street}
                      readonly
                    />
                    {/* <MDBProgress className="rounded">
                                          <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                        </MDBProgress> */}

                    <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                      City
                    </MDBCardText>
                    <MDBInput
                      label="Readonly"
                      placeholder="Readonly input here..."
                      id="formControlReadOnly"
                      type="text"
                      defaultValue={address.City}
                      readonly
                    />

                    <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                      State
                    </MDBCardText>
                    <MDBInput
                      label="Readonly"
                      placeholder="Readonly input here..."
                      id="formControlReadOnly"
                      type="text"
                      defaultValue={address.State}
                      readonly
                    />

                    <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                      Country
                    </MDBCardText>
                    <MDBInput
                      label="Readonly"
                      placeholder="Readonly input here..."
                      id="formControlReadOnly"
                      type="text"
                      defaultValue={address.Country}
                      readonly
                    />

                    <MDBCardText className="mb-2" style={{ textAlign: "left" }}>
                      Pincode
                    </MDBCardText>
                    <MDBInput
                      label="Readonly"
                      placeholder="Readonly input here..."
                      id="formControlReadOnly"
                      type="text"
                      defaultValue={address.Pincode}
                      readonly
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </>
          ))}
        </MDBRow>
      ) : address && address.length === 0 ? (
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCardText>No Address added?</MDBCardText>
              <MDBBtn onClick={toggleModal}>Add New Address</MDBBtn>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      ) : (
        ""
      )}
      {modal ? <ModalBox closeModal={setModal} userId={userId} /> : ""}
    </div>
  );
}

export default Address;
