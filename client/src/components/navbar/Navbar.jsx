import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>SAMSKRITI</span>
        </a>
        <a href="/">Home</a>
        <a href="https://shashwath454.github.io/fundus/">Donate</a>
        <a href="https://mapfinal-d3ost7mdb-sumedhnvdas-projects.vercel.app/">AI map</a>
        <a href="/">AI chat</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="https://shashwath454.github.io/fundus/">Donate</a>
          <a href="https://mapfinal-d3ost7mdb-sumedhnvdas-projects.vercel.app/">AI map</a>
          <a href="/">AI chat</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
