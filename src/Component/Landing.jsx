import React from "react"
import "../styles.css"
import logo from "../assets/CreativeBlock.png"
import { Link } from "react-router-dom"
import { Footer } from "./Footer"


const Landing = () => {

    return (
    <div className="obPage">
        <div id="landing" >
            <div id="button-container" className="center">
                <Link to='/login' className="smallButton">Login</Link>
                <Link to='/signup' className="smallButton">Register</Link>
            </div>
            <div id="logoLanding">
                <img id="Landinglogo" src={logo} alt="logo"/>
            </div>
        </div> 
        <Footer />
    </div>
    )
}


export default Landing
