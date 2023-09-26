// import React from 'react'
// import './Navbar.css'


// function Navbar() {
//   return (
//     <div className='nav-main'>
//         <nav>
//             <img src='' alt=""  className='logo'/>
//             <ul>
//                 <li><p>Home</p></li>
//                 <li><p>Profile</p></li>
//             </ul>
//         </nav>
//     </div>
//   )
// }

// export default Navbar
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
     navigate('/login')
     toast.success("Logged out successfully");
  }

  return (
    <>
    <Toaster />
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Logo</MDBNavbarBrand>
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
                <MDBNavbarLink active aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              
            </MDBNavbarNav>
            <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
              {/* <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' /> */}
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