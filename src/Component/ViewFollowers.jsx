import React from 'react';
import { Link } from 'react-router-dom';
import settingsIcon from "../assets/SettingsIcon.png";
import LogoutIcon from "../assets/LogoutIcon.png";
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";



export default class ViewFollowers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          user :  sessionStorage.getItem("user"),
          followingArr: [],
          followerArr: [],
          followingUsernames: [],
          followerUsernames: []
        };
    }

    async componentDidMount(){
        await this.following();
        
        await this.follower();

    
    //    console.log(this.state.followingArr)

        const x = this.state.followingArr.map(element => {
            // console.log(element)
            return (this.getUserDetails(element))
        });
        const following = await Promise.all(x)
        // console.log(this.state.followingArr)
        // console.log(following)


        const q = this.state.followerArr.map(element => {
            return this.getUserDetails(element)
        });
        const follower = await Promise.all(q)
        // console.log(follower)

        this.setState({followerUsernames: follower, followingUsernames: following})

    };


    async following() {
        await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections?fromUserID=${this.state.user}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                }
            })
            .then(result => result.json())
            .then(r => { 
                r[0].forEach(element => {
                var tempArr = this.state.followingArr
                   tempArr.push(element.toUserID)
                   this.setState({followingArr: tempArr})
                    
                });
                
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    
    async follower() {
    await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections?toUserID=${this.state.user}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
            }
        })
        .then(result => result.json())
        .then(r => { 
            r[0].forEach(element => {
            var tempArr = this.state.followerArr
                tempArr.push(element.fromUserID)
                this.setState({followerArr: tempArr})
                
            });
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    async getUserDetails(id) {
       
        return fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                }
        })
        .then(result => result.json())
        .then(r => { 
            // console.log(r.attributes.username)
            

            return r.attributes.username
        })
    }


    render() {
        var profileString = "/portfolio/" + sessionStorage.getItem("user")
        return (
        <>
            <div className="navbar">
                <Link to="/" style={{ float: "right", padding: "5px 10px 0px 10px" }} onClick={() => {sessionStorage.removeItem("token"); sessionStorage.removeItem("user")}}><img src={LogoutIcon} alt='Logout Icon'></img></Link>
                <Link to="/settings" style={{ float: "right", padding: "5px 10px 0px 10px" }}><img src={settingsIcon} alt='Settings Icon'></img></Link>
                <Link to="/gallery"><text>GALLERY</text><img className="navPic" src={galleryIcon} alt='Gallery'></img></Link>
                <Link to="/share">CREATE<img className="navPic" src={wandIcon} alt='Create Content'></img></Link>
                <Link to= {profileString}>PORTFOLIO<img className="navPic" src={portfolioIcon} alt='Portfolio'></img></Link>
                <Link to="/featured">FEATURED<img className="navPic" src={trophyIcon} alt='Featured Artists'></img></Link>
                <Link to="/followers" className="active">FOLLOWERS<img className="navPic" src={usersIcon} alt='Followers'></img></Link>
                <Link to="/about">ABOUT US<img className="navPic" src={infoIcon} alt='About Us'></img></Link>
            </div>
            <div id="all-follows">
        
                <div className='follows'>
                    <h1 className='followTitles'>Followers</h1>
                    {this.state.followerUsernames.map((element, i) => 
                    <>
                        <svg height={"70px"} width={"100%"}>
                            <rect x="25%" y="0" width="50%" height="50" style={{fill:"#EDEDED", rx:"25px"}}/>
                            <Link to={"/portfolio/" + this.state.followerArr[i]}>
                            <text x="50%" y="25" dominantBaseline="middle" textAnchor="middle" >{element}</text>
                            </Link>
                        </svg>
                        <br/>
                    </>
                    )}
                </div>
                <div className='follows'>
                    <h1 className='followTitles'>Following</h1>
                    {this.state.followingUsernames.map((element,i) => 
                    <>
                        <svg height={"70px"} width={"100%"}>
                            <rect x="25%" y="0" width="50%" height="50" style={{fill:"#EDEDED", rx:"25px"}}/>
                            <Link to={"/portfolio/" + this.state.followingArr[i]}>
                            <text x="50%" y="25" dominantBaseline="middle" textAnchor="middle" >{element}</text>
                            </Link>
                        </svg>
                        <br/>
                    </>
                    )}
                </div> 
            </div>
        </>
        );
    }
    


}