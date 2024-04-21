import React from "react"
import "../styles.css"
import FillForm from './CreateAccountButton'
import logo from "../assets/CreativeBlock.png"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from "./Footer"

const RegistrationPage = () => {
    return (
    
    <div className="obPage">
            <div className="obLogo">
                <img src={logo} alt="Creative Block Logo: Your weekly dose of inspiration."/>
            </div>
            <div>        
            <FillForm onAdd={SubmitForm}/>
            </div>
            <div className="RegistrationFooter">
                <Footer></Footer>
            </div> 
    </div>
    )
}

const SubmitForm = (enteredFields) => {
    fetch('https://webdev.cse.buffalo.edu/hci/api/api/ascii/auth/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            "email": enteredFields.email,
            "password": enteredFields.pw,
            "attributes": ({"firstname": "","lastname":"","username":enteredFields.user,"birthday": enteredFields.date, "accountPrivate": "public", "userBio": "", "followers": 0, "following": 0})
        })
    })
    .then(res => res.json())
    .then(
      error => {
        console.log("Error");
      },
      result => {
        console.log("Works");
      }
    )

    console.log("user account created")
}

export default RegistrationPage
