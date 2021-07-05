import React, { useState } from "react";
import Link from "next/link";
import config from "../config";

function Navbar({ logo, menu }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src={logo} alt="newspaper logo" />
        </div>
        <div onClick={toggleMenu} className={`menu-btn${open ? " open" : ""}`}>
          <div />
          <div />
        </div>
        <div className="nav-advt">
          <div className="demo-advt" style={{ backgroundImage: config.navAd ? `url(${config.navAd})` : undefined }} />
        </div>
      </div>
      <nav className={`navbar-links${open ? " open" : ""}`}>
        {menu.map((item, i) => (
          <Link href={item.to} key={i}>
            <a>{item.text}</a>
          </Link>
        ))}
      </nav>
      <div className="top-advt">
        <div className="demo-advt" style={{ backgroundImage: config.navAd ? `url(${config.navAd})` : undefined }} />
      </div>
    </div>
  );
}

export default Navbar;
