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
import values1 from "../assets/values1.png";
import values2 from "../assets/values2.png";
import values3 from "../assets/values3.png";
import MatthewProfile from "../assets/MatthewAboutUs.jpg"
import LaurenProfile from "../assets/LaurenAboutUs.png"
import AleenaProfile from "../assets/AleenaAboutUs.png"
import ElliotProfile from "../assets/ElliotAboutUs.jpg"
import XueweiProfile from "../assets/XueweiAboutUs.JPG"
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";


function AboutForm() {
    const navigate = useNavigate();
    var profileString = "/portfolio/" + sessionStorage.getItem("user")

    const NavigateMattsProfile = event => {

    };

    return (
        <>
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
            <div className="mission-flex">
                <div className="mission-header">
                    <p>
                        Mission <br></br>
                        Statement
                    </p>
                </div>
                <div className="mission-message">
                    <p>
                        At Creative Block, we think everyone is an artist in their own way!
                        Our Mission is to get you those creative juices flowing by providing
                        weekly inspiration through topics and themes!  We hope you are able
                        to find time during your busy schedule to make something awesome,  all while
                        building a digital portfolio. You can also explore other artists and vote for your favorite
                        content each week. You might even be selected as a featuerd artists!
                    </p>
                </div>
            </div>
            <div className="values-container">
                <div className="value-logo">
                    <img src={logo} width="100%" alt="Creative Block Logo"/>
                </div>
                <div className="value-list">
                    <div className="value-header">
                        Our Values
                    </div>
                    <div className="value-flex">
                        <img className="number-icon" src={values1} alt="number 1"/>
                        <div className="value-text">Promote Creative Thinking</div>
                    </div>
                    <div className="value-flex">
                        <img className="number-icon" src={values2} alt="number 2"/>
                        <div className="value-text">Encourage Collaboration</div>
                    </div>
                    <div className="value-flex">
                        <img className="number-icon" src={values3} alt="number 3"/>
                        <div className="value-text">Give Artists a Platform</div>
                    </div>
                </div>
            </div>
            <div className="team-header">
                    <p className="ourteamtext">Meet Our Team</p>
            </div>
            <div className="team-container">
                <div className="team-flex">
                    <Link to="/Lauren" className="aboutuslinks">
                        <img className="AboutUsImg" src={LaurenProfile} alt="logo"/>
                        <text className="AboutUsTxt">Lauren Richardson</text>
                    </Link>
                </div>
                <div className="team-flex">
                    <Link to="/Matthew" className="aboutuslinks">
                        <img className="AboutUsImg" src={MatthewProfile} alt="logo"/>
                        <text className="AboutUsTxt">Matthew Johnson</text>
                    </Link>
                </div>
                <div className="team-flex">
                    <Link to="/Aleena" className="aboutuslinks">
                        <img className="AboutUsImg" src={AleenaProfile} alt="logo"/>
                        <text className="AboutUsTxt">Aleena Sheikh</text>
                    </Link>
                </div>
                <div className="team-flex">
                    <Link to="/Xuewei" className="aboutuslinks">
                        <img className="AboutUsImg" src={XueweiProfile} alt="logo"/>
                        <text className="AboutUsTxt">Xuewei</text>
                        <text className="AboutUsTxt">Jiang</text>
                    </Link>
                </div>
                <div className="team-flex">
                    <Link to="/Elliot" className="aboutuslinks">
                        <img className="AboutUsImg" src={ElliotProfile} alt="logo"/>
                        <text className="AboutUsTxt">Elliot Usinski</text>
                    </Link>
                </div> 
            </div>
            <div className="AboutUsFooter">
                {/* <Footer></Footer> */}
            </div>
        </>
    );

}

export default AboutForm