import React from "react";
import { BsFillCartFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({ total_item }) => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKhpEvojtDfXKGUIXEhk_T5u9Ra-OBqCMCw&usqp=CAU"
            alt="logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          E-commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav  mb-2 mb-lg-0"
            style={{ marginLeft: "auto" }}
          >
            {location.pathname === "/" && (
              <li className="nav-item">
                <Link
                  to="cart"
                  className="position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <BsFillCartFill className="addTo__cart" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded bg-danger">
                    {total_item}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
