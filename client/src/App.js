import "./App.css";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Modal from "./components/Modal/Modal";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

function App() {
 const userData = JSON.parse(localStorage.getItem("userInfo"))
  console.log('userData',userData);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/register" element={userData ? <Navigate to="../"/> : <Register/>}></Route>
          <Route exact path="/login" element={userData ? <Navigate to="../"/> : <Login/>}></Route>
          <Route exact path = "/profile" element={<Profile />}></Route>
        
        </Routes>
      </Router>

      {/* <Login/> */}
      {/* <Profile/> */}
      {/* <Modal/> */}
    </div>
  );
}

export default App;
