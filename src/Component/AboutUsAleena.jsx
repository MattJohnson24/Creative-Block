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
import AleenaProfile from "../assets/AleenaAboutUs.png"
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";


function AleenaAboutForm() {

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
            ALEENA SHEIKH
        </h1>

        <img src={AleenaProfile} alt="Profile Picture: Aleena Sheikh"/>
        <p>
            Hi:) My name is Aleena Sheikh! I’m currently a senior at the University at Buffalo majoring in 
            Computer Science. I am 22 years old and was born and raised in Staten Island, New York. 
            I decided to attend UB for its high standard of education and exceptional computer science program 
            that I knew would prepare me for my career. I look forward to working in the tech industry as a 
            software engineer after graduation.   
        </p>
    </div>
    {/* <div className="AboutUsFooter">
            <Footer></Footer>
    </div>  */}
    </div>

    );

}

export default AleenaAboutForm