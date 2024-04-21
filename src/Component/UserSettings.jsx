import React from "react";
import'../styles.css';
import { Link, Navigate } from 'react-router-dom';
import settingsIcon from "../assets/SettingsIcon.png";
import LogoutIcon from "../assets/LogoutIcon.png";
import ProfilePicture from "./ProfilePicture";
import success from "../assets/checkicon.png"
import { Footer } from "./Footer";
import Landing from "./Landing";
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";
import ConfirmationModal from "./ConfirmationModal";


// Majority of code modeled after original Profile.jsx.
export default class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            birthday: "",
            userBio: "",
            file: "",
            fileID: "",
            blocked: [],
            path: "/hci/api/uploads/files/BEpSLjKJ7ySY_WWSkoIk26HAzmeKZMEiBAGqrsqWHIM.png",
            accountPrivate: "public",
            saved: false,
            imageSaved: false
        };
        this.fieldChangeHandler.bind(this);
    }

    // This is the function that will get called every time we change one of the fields tied to the user data source.
    // It keeps the state current so that when we submit the form, we can pull the value to update from the state.  Note that
    // we manage multiple fields with one function and no conditional logic, because we are passing in the name of the state
    // object as an argument to this method.
    fieldChangeHandler(field, e) {
        this.setState({
            [field]: e.target.value
        });
    }

    uploadPictureHandler = event => {
        this.file = event.target.files[0];
        if (this.state.fileID !== "") {
            this.submitUpdatedProfilePicture();
        }
        else {
            this.submitFirstProfilePicture();
        }
    }

    // Submits default profile pic if user does not have one set
    submitFirstProfilePicture = event => {
        console.log("ran first Profile");
        const formData = new FormData();
        formData.append("uploaderID", sessionStorage.getItem("user"));
        formData.append("attributes", JSON.stringify({ "profile": true }));
        formData.append("file", this.file);
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads/", {
            method: "post",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: formData
        })
            .then(res => res.json())
            .then(
                error => {
                    this.setState({
                        imageSaved: true
                    })
                    this.componentDidMount();
                },
                result => {
                    // Updates path variable when result is returned
                    this.setState({
                        path: result.path || this.state.path
                    })
                    this.setState({
                        imageSaved: true
                    })
                    this.componentDidMount();
                }
            )
    }

    // Updates existing profile picture
    submitUpdatedProfilePicture = event => {
        const formData2 = new FormData();
        formData2.append("uploaderID", sessionStorage.getItem("user"));
        formData2.append("attributes", JSON.stringify({ "profile": true }));
        formData2.append("file", this.file);
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads/" + this.state.fileID, {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: formData2
        })
            .then(res => res.json())
            .then(
                result => {
                    // Updates path variable when result is returned
                    this.setState({
                        path: result.path || this.state.path
                    })
                    this.setState({
                        imageSaved: true
                    })
                    this.componentDidMount();
                },
                error => {
                    this.componentDidMount();
                }
            );
    };
    
    // This is the function that will get called the first time that the component gets rendered.  This is where we load the current
    // values from the database via the API, and put them in the state so that they can be rendered to the screen.  
    componentDidMount() {

        // fetch the user data, and extract out the attributes to load and display
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/"+sessionStorage.getItem("user"), {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(
            result => {
                if (result) {
                    if (result.attributes){
                        this.setState({
                            // IMPORTANT!  You need to guard against any of these values being null.
                            // set defaults to 
                            firstname: result.attributes.firstname || "",
                            lastname: result.attributes.lastname || "",
                            username: result.attributes.username || "",
                            userBio: result.attributes.userBio || "",
                            birthday: result.attributes.birthday || "",
                            accountPrivate: result.attributes.accountPrivate || "",
                            blocked: result.attributes.blocked || []
                        });
                    }
                }
            },
            error => {
                alert("error!");
            }
            );

            // Builds query string to be used in API request
            const queryString = encodeURIComponent('{ "path": "profile", "equals": ' + true + '}')
            fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads?uploaderID=${sessionStorage.getItem('user')}&attributes=${queryString}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(
                    result => {
                        if (result) {
                            this.path = result[0][0].path;
                            this.fileID = result[0][0].id;
                            this.setState({
                                fileID: result[0][0].id || "",
                                path: result[0][0].path || this.state.path,
                            });
                        }
                    }
                ).catch(
                    (error) => {
                        console.error(error);
                      }
                );
        }

    // Deletes the users account when the "Delete Account" button is clicked
    deleteAccountHandler = event => {
        // keep the form from actually submitting
        event.preventDefault();

        // ask for confirmation
                    
        // delete the account
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/" + sessionStorage.getItem("user") + "?relatedObjectsAction=delete", {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(sessionStorage.removeItem("token"), sessionStorage.removeItem("user"), console.log("deleted account"));
        // redirect to landing page
        window.location.replace("https://webdev.cse.buffalo.edu/hci/teams/ascii/");
        
    };



    submitHandler = event => {
        this.setState({
            saved: true
          });
        //keep the form from actually submitting, since we are handling the action ourselves via
        //the fetch calls to the API
        event.preventDefault();
    
        //make the api call to the user controller, and update the user fields (username, firstname, lastname)
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/"+sessionStorage.getItem("user"), {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
          body: JSON.stringify({
            attributes: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                userBio: this.state.userBio,
                birthday: this.state.birthday,
                accountPrivate: this.state.accountPrivate,
                blocked: this.state.blocked
            }
        })
        })
        .then(res => res.json())
          .then(
            result => {
              this.setState({
                responseMessage: result.Status
              });
            },
            error => {
              alert("error!");
            }
          );
      };

    // The following renders the Settings page.
    render() {
        var profileString = "/portfolio/" + sessionStorage.getItem("user")

        return (
            <div className="obPage">
                <div className="navbar">
                    <Link to="/" style={{ float: "right", padding: "5px 10px 0px 10px" }} onClick={() => {sessionStorage.removeItem("token"); sessionStorage.removeItem("user")}}><img src={LogoutIcon} alt='Logout Icon'></img></Link>
                    <Link to="/settings" className="active" style={{ float: "right", padding: "5px 10px 0px 10px" }}><img src={settingsIcon} alt='Settings Icon'></img></Link>
                    <Link to="/gallery"><text>GALLERY</text><img className="navPic" src={galleryIcon} alt='Gallery'></img></Link>
                    <Link to="/share">CREATE<img className="navPic" src={wandIcon} alt='Create Content'></img></Link>
                    <Link to= {profileString}>PORTFOLIO<img className="navPic" src={portfolioIcon} alt='Portfolio'></img></Link>
                    <Link to="/featured">FEATURED<img className="navPic" src={trophyIcon} alt='Featured Artists'></img></Link>
                    <Link to="/followers">FOLLOWERS<img className="navPic" src={usersIcon} alt='Followers'></img></Link>
                    <Link to="/about">ABOUT US<img className="navPic" src={infoIcon} alt='About Us'></img></Link>
                </div>
                <form onSubmit={this.submitHandler} className="settingsForm">
                  <h1>ACCOUNT SETTINGS</h1>
                  <hr className="breakLineProfilePage"/><br />
                  <div id="settingsInput">
                      <ProfilePicture path={this.state.path}/>
                      <div className="successbox">
                          {this.state.imageSaved ? <div className="successmsg"><img src={success} className="successIcon" alt="Success"></img><label className="successText">Profile Picture Updated</label></div>  : ""}
                      </div>
                      <label style={{'height': '45px', 'lineHeight': '45px', 'width':'99%'}} className="largeButton">UPDATE PHOTO
                          <input type='file' id='file' style={{ display: 'none'}} onChange={this.uploadPictureHandler}></input>
                      </label>
                        <label htmlFor="firstname" className="settingsLabels">First Name</label><br />
                        <input name="firstname" type="text" className="inputField" id="settings_input1" onChange={e => this.fieldChangeHandler("firstname", e)} value={this.state.firstname}/>
                        <label htmlFor="lastname" className="settingsLabels">Last Name</label><br />
                        <input name="lastname" type="text" className="inputField" id="settings_input1" onChange={e => this.fieldChangeHandler("lastname", e)} value={this.state.lastname}/>
                        <label htmlFor="username" className="settingsLabels">Username</label><br />
                        <input type="text" className="inputField" id="settings_input1" onChange={e => this.fieldChangeHandler("username", e)} value={this.state.username}/>
                        <label htmlFor="userBio" className="settingsLabels">Biography</label><br />
                        <input name="userBio" type="text" className="inputField" id="settings_input2" onChange={e => this.fieldChangeHandler("userBio", e)} placeholder="Update your bio here..." value={this.state.userBio}/>
                        <label htmlFor="birthday" className="settingsLabels">Birthday</label><br />
                        <input name="birthday" type="date" className="inputField" id="settings_input1" onChange={e => this.fieldChangeHandler("birthday", e)} value={this.state.birthday}/>
                        <input type="radio" id="public" name="accountPublic" value="public" onChange={e => this.fieldChangeHandler("accountPrivate", e)} checked={this.state.accountPrivate === "public"}/>
                        <label className="settingsRadio" htmlFor="accountPublic"> <b>Public</b>: All users can view and interact with your posts.</label><br />
                        <input  type="radio" id="private" name="accountPrivate" value="private" onChange={e => this.fieldChangeHandler("accountPrivate", e)} checked={this.state.accountPrivate === "private"}/>
                        <label className="settingsRadio"htmlFor="accountPrivate"> <b>Private</b>: Content you create will not be viewable in the gallery.</label><br />
                  </div><br />
                  <input id="settingsButton" style={{'height': '45px', 'lineHeight': '45px', 'width':'99%'}}  className="largeButton" type="submit" value="SAVE ACCOUNT SETTINGS"/><br />
                  <div className="successbox">
                    {this.state.saved ? <div className="successmsg"><img src={success} className="successIcon" alt="Success"></img><label className="successText">Settings Updated</label></div>  : ""}
                  </div>
                  <hr className="breakLineProfilePage"/>
                  <label htmlFor="delete" id="delete-button" style={{'lineHeight': '35px'}} className="smallButton">DELETE ACCOUNT</label>
                  <input name="delete" id="delete" type="submit"  style={{ display: "none" }} onClick={(e) => this.setState({ isOpen: true })}></input>
                    <ConfirmationModal isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
                        <p>Are you sure you want to delete your account?</p>
                        <div className='confirmation-values'>
                            <button className='smallButton' onClick={this.deleteAccountHandler}>YES</button>
                            <button className='smallButton' onClick={(e) => this.setState({ isOpen: false })}>NO</button>
                        </div>
                    </ConfirmationModal>
                    <br /><br />
                 {this.state.responseMessage}
              </form>
            {/* <Footer />  */}
            </div>   
        );
    }
}