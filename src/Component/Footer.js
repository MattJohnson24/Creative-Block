import React from "react";
import "../styles.css";
import logo from "../assets/CreativeBlock.png";
import logo2 from "../assets/BlockLogo.png";

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
        <div className="footer-grid">
            <div className="footer-left">
                <div id="large-logo">
                    <a href="https://webdev.cse.buffalo.edu/hci/teams/ascii/"><img src={logo} alt='Creative Block Logo'></img></a>
                </div>
                <div id="small-logo">
                    <a href="https://webdev.cse.buffalo.edu/hci/teams/ascii/"><img src={logo2} alt='Creative Block Logo'></img></a>
                </div>
            </div>
            <div className="footer-right">
                <div>
                    <span><b>Account</b></span><br></br>
                    <Link to="/login">Sign In</Link><br></br>
                    <Link to="/signup">Register</Link><br></br>
                    <Link to="/forgot">Reset Password</Link>
                </div>
                <div>
                    <span><b>About Us</b></span><br></br>
                    <Link to="/about">Mission & Values</Link><br></br>
                    <Link to="/about">Developers</Link><br></br>
                    <a href="https://webdev.cse.buffalo.edu/hci/teams/ascii/style_guide.html">Style Guide</a><br></br>
                    <a target="_blank" href="https://www.buffalo.edu/">University at Buffalo</a>

                </div>
                <div>
                    <span><b>Help Center</b></span><br></br>
                    <Link to="#CONTACT_US">Contact Us</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer