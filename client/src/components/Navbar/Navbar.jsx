import React from 'react'
import './Navbar.css'
// import Logo from '../../assets/images/logo.png'

function Navbar() {
  return (
    <div className='nav-main'>
        <nav>
            <img src='' alt=""  className='logo'/>
            <ul>
                <li><p>Home</p></li>
                <li><p>Profile</p></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar