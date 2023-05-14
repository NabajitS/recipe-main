import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RecipeContext } from "../context/RecipeContext";
// import { useLogout } from '../hooks/useLogout'
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      {user ? (
        <>
          <Link className="logo" to="/">
            Food Network
          </Link>


        <div className="link-box">
          <div>
            <a href="#" onClick={() => {handleLogoutClick() }}>Logout</a>
          </div>
          <div>
            <Link to="/create"> CreateRecipe </Link>
          </div>
          <div className="user-name">
            <a>{user.userName}</a>
          </div>
        </div>

        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
