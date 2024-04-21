import React from 'react'
import UploadForm from './UploadForm'
import BackButton  from './BackButton'
import { ThemeStrip } from './ThemeStrip'
import { Link } from 'react-router-dom'
import settingsIcon from "../assets/SettingsIcon.png";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "../assets/LogoutIcon.png";
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";


const ShareContent = () => {
    
    const navigate = useNavigate();

    const upload= async (content) => {
        var formData = new FormData();
        for(var n in content){
            if (n === "attributes"){
                var attributes = JSON.stringify(content[n])
                formData.append(n, attributes);
            }else{
                formData.append(n, content[n]);
            }
        }

        const res = await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads`,{
            method: 'POST',
            headers:{
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            body: formData,
        }).then(response => response.json())
        .then(result => {
          console.log('Success:', result);
            navigate('/gallery')
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    
    var profileString = "/portfolio/" + sessionStorage.getItem("user")

    return (
        <>
            <div className="navbar">
                <Link to="/" style={{ float: "right", padding: "5px 10px 0px 10px" }} onClick={() => {sessionStorage.removeItem("token"); sessionStorage.removeItem("user")}}><img src={LogoutIcon} alt='Logout Icon'></img></Link>
                <Link to="/settings" style={{ float: "right", padding: "5px 10px 0px 10px" }}><img src={settingsIcon} alt='Settings Icon'></img></Link>
                <Link to="/gallery"><text>GALLERY</text><img className="navPic" src={galleryIcon} alt='Gallery'></img></Link>
                <Link to="/share" className="active">CREATE<img className="navPic" src={wandIcon} alt='Create Content'></img></Link>
                <Link to= {profileString}>PORTFOLIO<img className="navPic" src={portfolioIcon} alt='Portfolio'></img></Link>
                <Link to="/featured">FEATURED<img className="navPic" src={trophyIcon} alt='Featured Artists'></img></Link>
                <Link to="/followers">FOLLOWERS<img className="navPic" src={usersIcon} alt='Followers'></img></Link>
                <Link to="/about">ABOUT US<img className="navPic" src={infoIcon} alt='About Us'></img></Link>
            </div>
            <ThemeStrip />
            <BackButton />
            <UploadForm onAdd={upload} />
        </>
    )
}

export default ShareContent