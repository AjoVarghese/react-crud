import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'

function Home() {

  const userData = JSON.parse(localStorage.getItem("userInfo"))

  return (
    
      <div className="home-main">
        <div className="nav-header">
          <Navbar/>
        </div>
        <div className="home-content">
          {
            userData ? <h1>Welcome  {userData.Name}!</h1> : <h1>Login for further features!</h1>
          }
      

        </div>
      </div>

  )
}

export default Home