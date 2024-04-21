import React from "react";
import '../styles.css';
import { Link } from "react-router-dom";
import settingsIcon from "../assets/SettingsIcon.png";
import ProfilePicture from "./ProfilePicture.jsx";
import Portfolio from "./Portfolio";
import ProfileInfo from "./ProfileInfo.js";
import LogoutIcon from "../assets/LogoutIcon.png";
import FollowingValues from "./FollowingValues";
import FollowButton from "./FollowButton";
import editIcon from "../assets/editIcon.png";
import BlockButton from "./BlockButton";
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            path: "",
            file: ""
        };
    }

    

    // This is the function that will get called every time we change one of the fields tied to the user data source.
    // It keeps the state current so that when we submit the form, we can pull the value to update from the state.  Note that
    // we manage multiple fields with one function and no conditional logic, because we are passing in the name of the state
    // object as an argument to this method.


    // This is the function that will get called the first time that the component gets rendered.  This is where we load the current
    // values from the database via the API, and put them in the state so that they can be rendered to the screen.  

    // The following renders the Settings page.
    render() {
        var profileString = "/portfolio/" + sessionStorage.getItem("user")
        var thisProfileID = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
        let button;
        let blockButton;
        if(thisProfileID == sessionStorage.getItem("user")) {
            button = 
            <div className="edit">
                <Link className="smallButton" to='/settings'><img src={editIcon} alt='Edit Profile Information' width='100%'></img> EDIT PROFILE</Link> 
            </div>
        } else {
            button = <FollowButton OtherUser={thisProfileID}></FollowButton>
            blockButton = <BlockButton otherUser={thisProfileID}></BlockButton>
        }
        
        return (
            <>
                <div className="navbar">
                    <Link to="/" style={{ float: "right", padding: "5px 10px 0px 10px" }} onClick={() => {sessionStorage.removeItem("token"); sessionStorage.removeItem("user")}}><img src={LogoutIcon} alt='Logout Icon'></img></Link>
                    <Link to="/settings" style={{ float: "right", padding: "5px 10px 0px 10px" }}><img src={settingsIcon} alt='Settings Icon'></img></Link>
                    <Link to="/gallery"><text>GALLERY</text><img className="navPic" src={galleryIcon} alt='Gallery'></img></Link>
                    <Link to="/share">CREATE<img className="navPic" src={wandIcon} alt='Create Content'></img></Link>
                    <Link to= {profileString} className="active">PORTFOLIO<img className="navPic" src={portfolioIcon} alt='Portfolio'></img></Link>
                    <Link to="/featured">FEATURED<img className="navPic" src={trophyIcon} alt='Featured Artists'></img></Link>
                    <Link to="/followers">FOLLOWERS<img className="navPic" src={usersIcon} alt='Followers'></img></Link>
                    <Link to="/about">ABOUT US<img className="navPic" src={infoIcon} alt='About Us'></img></Link>
                </div>
                <div className="profile-content">
                    <div className="profile-flex">
                        <div className="profile-left">
                            <ProfilePicture userID={thisProfileID}></ProfilePicture>
                            <FollowingValues ProfileID={thisProfileID}></FollowingValues>
                        </div>
                        <div className="profile-right">
                            <ProfileInfo></ProfileInfo>
                            <div className="follow-block">
                                <div className="follow-button-div">{button}</div>
                                <div className="block-button-div">{blockButton}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr className="breakLineProfilePage"/>
                <Portfolio></Portfolio>
            </>
        );
    }
}