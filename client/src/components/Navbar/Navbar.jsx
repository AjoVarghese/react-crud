import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

export default function Navbar() {
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userInfo"))

  const logout = () => {
     localStorage.removeItem("userInfo")
     toast.success("Logged out successfully");
     setTimeout(() => {
      navigate('/');
    }, 2000);
     
  }

  return (
    <>
    <Toaster />
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>User Management</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page'>
                  <Link
                   to="/"
                   style={{  textDecoration: "none" , color:'#3B71CA'}}
                  >
                    Home
                  </Link>
                  
                </MDBNavbarLink>
              </MDBNavbarItem>
              {
                userData ? <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page'>
                <Link
                   to="/profile"
                   style={{  textDecoration: "none" , color:'#3B71CA'}}
                  >
                    Profile
                  </Link>
                </MDBNavbarLink>
              </MDBNavbarItem> : ''
              }
            </MDBNavbarNav>
            <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
              {
                userData ? <MDBBtn outline onClick={logout}>Logout</MDBBtn>
                 : 
                 <Link
                    to="/login"
                    style={{  textDecoration: "none" }}
                  >
                 <MDBBtn outline >
                    Login
                 </MDBBtn>
                 </Link>
              }
               
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}