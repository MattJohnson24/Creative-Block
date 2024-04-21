import React from "react";
import "../styles.css"
import logo from "../assets/CreativeBlock.png"
import error from "../assets/erroricon.png"
import {
  Link,
  Navigate
} from 'react-router-dom';
import { Gallery } from "./Gallery";
import { Footer } from "./Footer";


// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alanmessage: "",
      sessiontoken: "",
      invalidEmail: false,
      invalidPassword: false,
      invalidLogin: false
    };
    this.refreshPostsFromLogin = this.refreshPostsFromLogin.bind(this);
  }

  // once a user has successfully logged in, we want to refresh the post
  // listing that is displayed.  To do that, we'll call the callback passed in
  // from the parent.
  refreshPostsFromLogin() {
    console.log("CALLING LOGIN IN LOGINFORM");
    this.props.login();
  }

  // change handlers keep the state current with the values as you type them, so
  // the submit handler can read from the state to hit the API layer
  myChangeHandler = event => {
    this.setState({
      email: event.target.value
    });
  };

  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  };

  // when the user hits submit, process the login through the API
  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();
    this.setState({
      invalidLogin: false
    });
    if(this.state.email != "" && this.state.password != ""){
      var emailfield = document.getElementById("email");
      var passwordfield = document.getElementById("password");
      emailfield.style.border = "none";
      passwordfield.style.border = "none";
      this.setState({
        invalidEmail: false
      });
      this.setState({
        invalidPassword: false
      });
    //make the api call to the authentication page
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/auth/login", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.userID) {

            // set the auth token and user ID in the session state
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("user", result.userID);

            this.setState({
              sessiontoken: result.token,
              alanmessage: result.token
            });
            // <Navigate to="/gallery"/>
            // call refresh on the posting list
            this.refreshPostsFromLogin();
          } else {

            // if the login failed, remove any infomation from the session state
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message
            });
          }
        },
        error => {
          console.log("Invalid Login Credentials");
          this.setState({
            invalidLogin: true
          });
        }
      );
    }
    else{
      var emailfield = document.getElementById("email");
      var passwordfield = document.getElementById("password");
      if(this.state.email == ""){
        emailfield.style.border = "1px solid red";
        this.setState({
          invalidEmail: true
        });
      }
      else{
        emailfield.style.border = "none";
        this.setState({
          invalidEmail: false
        });
      }
      if(this.state.password == ""){
        passwordfield.style.border = "1px solid red";
        this.setState({
          invalidPassword: true
        });
      }
      else{
        passwordfield.style.border = "none";
        this.setState({
          invalidPassword: false
        });
      }
    }
    
    
  };

  render() {
     //console.log("Rendering login, token is " + sessionStorage.getItem("token"));

    if (!sessionStorage.getItem("token")) {
      return (
        <div className="obPage">
            <div className="obLogo">
              <img src={logo} alt="Creative Block Logo: Your weekly dose of inspiration."/>
            </div>
            <div>
              <form onSubmit={this.submitHandler} className="obBox">
                <input type="email" onChange={this.myChangeHandler} id="email" name="email" placeholder="email address"  className="formField"/><br />
                <div className="errorbox">
                  {this.state.invalidEmail ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter an email</label></div> : ""}
                </div>
                <input type="password" onChange={this.passwordChangeHandler} id="password" name="password" placeholder="password" className="formField"/>
                <div className="errorbox">
                  {this.state.invalidPassword ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a password</label></div> : ""}
                </div>
                <div className="errorbox">
                  {this.state.invalidLogin ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Invalid credentials, Please try again</label></div> : ""}
                </div>
                <br />
                <p className="obText">
                  <Link to="/forgot" className="textLinks">Forgot Password?</Link>
                </p>
                <hr className="breakLine"/>
                <input type="submit" value="LOGIN" className="largeButton"/>
                <br />
                <p className="obText">
                  New to Creative Block? &nbsp;
                  <Link to="/signup" className="textLinks">Register here.</Link>
                </p>
                {this.state.alanmessage}
              </form>
          </div>
          <Footer />
        </div>
      );
    } else {
      return <Gallery></Gallery>;
    }
  }
}