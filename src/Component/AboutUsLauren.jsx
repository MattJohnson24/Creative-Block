import React from "react";
import "../styles.css"
import logo from "../assets/BlockLogo.png"
import {
    Link
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Footer } from "./Footer";
import settingsIcon from "../assets/SettingsIcon.png";
import LogoutIcon from "../assets/LogoutIcon.png";
import LaurenProfile from "../assets/LaurenAboutUs.png"
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";


function LaurenAboutForm() {
    var profileString = "/portfolio/" + sessionStorage.getItem("user")

    return (
        <div>
            <div className="navbar">
                <Link to="/" style={{ float: "right", padding: "5px 10px 0px 10px" }} onClick={() => {sessionStorage.removeItem("token"); sessionStorage.removeItem("user")}}><img src={LogoutIcon} alt='Logout Icon'></img></Link>
                <Link to="/settings" style={{ float: "right", padding: "5px 10px 0px 10px" }}><img src={settingsIcon} alt='Settings Icon'></img></Link>
                <Link to="/gallery"><text>GALLERY</text><img className="navPic" src={galleryIcon} alt='Gallery'></img></Link>
                <Link to="/share">CREATE<img className="navPic" src={wandIcon} alt='Create Content'></img></Link>
                <Link to= {profileString}>PORTFOLIO<img className="navPic" src={portfolioIcon} alt='Portfolio'></img></Link>
                <Link to="/featured">FEATURED<img className="navPic" src={trophyIcon} alt='Featured Artists'></img></Link>
                <Link to="/followers">FOLLOWERS<img className="navPic" src={usersIcon} alt='Followers'></img></Link>
                <Link to="/about" className="active">ABOUT US<img className="navPic" src={infoIcon} alt='About Us'></img></Link>
            </div>
            <div className="dev_profiles">
                <h1>
                    LAUREN RICHARDSON
                </h1>

                <img src={LaurenProfile} alt="Profile Picture: Lauren Richardson"/>
                <p>
                    Hello! I'm Lauren, a senior studying computer science
                    at The University at Buffalo. I love working in front-end
                    development and technical communication. I am a Buffalo,
                    NY native, but will be relocating to Seattle, WA this summer
                    with my husband, Ethan and american eskimo dog, Blizzard. After
                    graduation, I will begin my first rotational as a Technical
                    Program Manager at Expedia Group.
                    <br></br>
                    <br></br>
                    Before this, I was high school math teacher for almost
                    seven years and hold a NYS Professional Teaching Certification.
                    My first degree was a BS in Math Education at Fredonia State
                    Unviersity followed by my MS in Educational Technology at
                    Canisius College.
                </p>
            </div>
            {/* <Footer></Footer> */}
        </div>

    );
}

export default LaurenAboutForm