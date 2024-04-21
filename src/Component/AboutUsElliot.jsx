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
import ElliotProfile from "../assets/ElliotAboutUs.jpg"
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";


function ElliotAboutForm() {

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
        <div class="dev_profiles">
        <h1>
            ELLIOT USINSKI
        </h1>

        <img src={ElliotProfile} alt="Profile Picture: Elliot Usinski"/>
        <p>
            Hey, I'm Elliot! I'm a senior Computer Science student at the University at Buffalo. I enjoy data science and plan on 
            incorporating data elements into my future position at M&T. I was born and raised in Buffalo, New York and plan to stay 
            as I love the snow.
            <br>
            </br>
            <br>
            </br>
            Some hobbies I have on the side are playing TES: Online and writing fiction.
            </p>
    </div>
    {/* <div className="AboutUsFooter">
            <Footer></Footer>
    </div>  */}
    </div>

    );

}

export default ElliotAboutForm