import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import settings from "../icons/settings.svg";
import danger from "../icons/danger.svg"
import "./navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className="navbar">
        <div className="navbar-elements" ref={menuRef}>
          {/* <img
            src={danger}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(!open);
            }}
          /> */}
          <div>
            <NavLink
            to={"/alarms"}
            style={{ textDecoration: "none" }}
            className={"link"}
            >
              {/* <li> */}
                <img src={danger} alt="" />
              {/* </li> */}
            </NavLink>
          </div>
          {/* <div
            className={`settings-dropdown ${open ? "active" : "inactive"}`}
          ></div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
