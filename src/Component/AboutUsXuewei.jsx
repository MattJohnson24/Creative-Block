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
import XueweiProfile from "../assets/XueweiAboutUs.JPG"
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";


function XueweiAboutForm() {

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
                XUEWEI JIANG
            </h1>

            <img src={XueweiProfile} alt="Profile Picture: Xuewei Jiang"/>
            <p>
                Hello! I'm Xuewei, you can call me Marvin. I'm a senior computer science student at University at Buffalo.
                I want to be a full stack developer after graduation and make some inspiring app that people love to use in a daily basis.
                I also love machine learning, which is the field I want to continue on for my Master degree. 
                <br></br>
                <br></br>
                In my spare time, I love playing games and basketball. I also like great food from all over the world.
            </p>
        </div>
    {/* <div className="AboutUsFooter">
            <Footer></Footer>
    </div>  */}
    </div>

    );

}

export default XueweiAboutForm