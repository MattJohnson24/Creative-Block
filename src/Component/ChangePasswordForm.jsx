import React from "react";
import "../styles.css"
import logo from "../assets/CreativeBlock.png"
import {
  Link
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Footer } from "./Footer";
import error from "../assets/erroricon.png"


function ChangePasswordForm() {

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidToken, setInvalidToken] = useState(false);
  const [invalidMatchingPassword, setInvalidMatchingPassword] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [missingConfirmPassword, setConfirmMissingPassword] = useState(false);
  const [missingToken, setMissingToken] = useState(false);
  const navigate = useNavigate();

  const submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();
    setMissingPassword(false);
    setConfirmMissingPassword(false);
    setInvalidMatchingPassword(false);
    setInvalidToken(false);
    setMissingToken(false);

    if(token == ""){
      setMissingToken(true);
    }
    if(password == ""){
      setMissingPassword(true);
    }
    if(confirmPassword == ""){
      setConfirmMissingPassword(true);
    }
    if(password !== confirmPassword){
      setInvalidMatchingPassword(true);
    }
    if(!(token == "") && !(password == "") && !(confirmPassword == "") && !(password !== confirmPassword)){
          //make the api call to the authentication page
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/auth/reset-password", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        password: password,
      })
    })
    .then(res => res.json())
      .then(
        error => {
          setInvalidToken(true);
        },
        result => {
          console.log("Works");
          navigate('/login');
        }
      )
    }
  };

        return(
          <div className="obPage">
            <div className="obLogo">
              <img src={logo} alt="creative block logo" />
            </div>
            <div>
              <form onSubmit={submitHandler} className="obBox">
                <input type="text" id="token" name="token" placeholder="enter reset token" className="formField" onChange={(event) => setToken(event.target.value)}/>
                <div className="errorbox">
                  {invalidToken ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Invalid Token</label></div> : ""}
                </div>
                <div className="errorbox">
                  {missingToken ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a token</label></div> : ""}
                </div>
                <input type="password"  id="password" name="password" placeholder="new password" className="formField" onChange={(event) => setPassword(event.target.value)}/>
                <div className="errorbox">
                  {missingPassword ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a password</label></div> : ""}
                </div>
                <input type="password"  id="confirmpassword" name="confirmpassword" placeholder="confirm password" className="formField" onChange={(event) => setConfirmPassword(event.target.value)}/>
                <div className="errorbox">
                  {missingConfirmPassword ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a confirmation password</label></div> : ""}
                </div>
                <div className="errorbox">
                  {invalidMatchingPassword ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Passwords must be matching</label></div> : ""}
                </div>
                <hr className="breakLine"/>
                <input type="submit" value="Reset Password" className="largeButton"/>
                <br></br>
                <p className="obText">Need to login? &nbsp;
                  <Link to="/login" className="textLinks">Login here.</Link>
                </p>
              </form>  
            </div>
            <Footer />
          </div>
        );

}

export default ChangePasswordForm