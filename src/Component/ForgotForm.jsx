import React from "react";
import "../styles.css"
import logo from "../assets/CreativeBlock.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Footer } from "./Footer";
import error from "../assets/erroricon.png"


function ForgotForm() {

  const [email, setEmail] = useState("");
  const [missingEmail, setMissingEmail] = useState("");
  const navigate = useNavigate();

  const submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();
    setMissingEmail(false);
    //make the api call to the authentication page
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/auth/request-reset", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      })
    })
      .then(res => res.json())
      .then(
        error => {
          setMissingEmail(true);
        },
        result => {
          console.log("Works");
          navigate('/reset');
        }
      )
  };
  
    
    return (
      <div className="obPage">
        <div className="obLogo">
          <img src={logo} alt="creative block logo"/>
        </div>
        <div>
          <form onSubmit={submitHandler} className="obBox">
            <input type="email" id="email" name="email" placeholder="enter valid UB email" className="formField" value={email} onChange={ (event) => setEmail(event.target.value) }/>
            <div className="errorbox">
                {missingEmail ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter an email</label></div> : ""}
            </div>
            <hr className="breakLine" />
            <input type="submit" value="SEND CODE" className="largeButton"/>
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

export default ForgotForm