import React from "react";
import '../styles.css';


export default class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            path: "/hci/api/uploads/files/BEpSLjKJ7ySY_WWSkoIk26HAzmeKZMEiBAGqrsqWHIM.png",
            file: "",
            loaded: false
        };
    }

    // This is the function that will get called every time we change one of the fields tied to the user data source.
    // It keeps the state current so that when we submit the form, we can pull the value to update from the state.  Note that
    // we manage multiple fields with one function and no conditional logic, because we are passing in the name of the state
    // object as an argument to this method.

    componentDidMount() {
        if(this.props.userID) {
        const queryString = encodeURIComponent('{ "path": "profile", "equals": ' + true + '}')
        fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads?uploaderID=${this.props.userID}&attributes=${queryString}`, {
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
                        this.id = result[0][0].id;
                        this.loaded = true;
                        this.setState({
                            id: result[0][0].id || "",
                            path: result[0][0].path || this.state.path,
                            loaded: true
                        });
                    }
                }
                
            )
            .catch(
                (error) => {
                    console.error(error);
                  }
            );
        }
    }


    // The following renders the Profile picture.
    render() {
        if(this.props.path) {
            return (
                <div className="profile-picture">
                    <img src={"https://webdev.cse.buffalo.edu" + this.props.path} alt="Profile Pic" className="profile-image"/>
                </div>
            );
        } 
        else {
            return (
                <div className="profile-picture">
                    <img src={"https://webdev.cse.buffalo.edu" + this.state.path} alt="Profile Pic" className="profile-image"/>
                </div>
            );
        }
    }
}