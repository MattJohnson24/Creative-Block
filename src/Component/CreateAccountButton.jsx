import { useState } from 'react'
import React from "react"
import "../styles.css"
import { Link, useNavigate } from 'react-router-dom'
import error from "../assets/erroricon.png"

const  FillForm = ({onAdd}) => { 
    const [email, setEmail]  = useState('')
    const [user, setUser]  = useState('')
    const [pw, setPW]  = useState('')
    const [pw2, setPW2]  = useState('')
    const [date, setDate]  = useState('')
    
    const [invalidToken, setInvalidToken] = useState(false);
    const [missingEmail, setMissingEmail] = useState(false);
    const [missingUsername, setMissingUsername] = useState(false);
    const [missingPassword, setMissingPassword] = useState(false);
    const [missingConfirmPassword, setMissingConfirmPassword] = useState(false);
    const [invalidMatchingPassword, setInvalidMatchingPassword] = useState(false);
    const [missingDate, setMissingDate] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault()

        setMissingEmail(false);
        setMissingUsername(false);
        setMissingPassword(false);
        setMissingConfirmPassword(false);
        setInvalidMatchingPassword(false);
        setMissingDate(false);

        if(!email){
            setMissingEmail(true);
        }

        if(!user){
            setMissingUsername(true);
        }

        if(!pw){
            setMissingPassword(true);
        }

        if(!pw2){
            setMissingConfirmPassword(true);
        }

        if(!date){
            setMissingDate(true);
        }

        if(pw !== pw2){
            setInvalidMatchingPassword(true);
        }
        
        if(!email || !user || !pw || !pw2 || !date){
            return
        }

        onAdd({ email,user,pw,pw2,date});

        navigate('/login')
    }

    return(
        <div>
            <div className="obBox">
                <form onSubmit={onSubmit}>
                    <input type="email" className="formField" id="emailField" name="emailField" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="errorbox">
                        {missingEmail ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter an email</label></div> : ""}
                    </div>
                    <input type="text" className="formField" id="usernameField" name="usernameField" placeholder="username" value={user} onChange={(e) => setUser(e.target.value)}/>
                    <div className="errorbox">
                        {missingUsername ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a username</label></div> : ""}
                    </div>
                    <input type="password" className="formField" id="passwordField" name="passwordField" placeholder="password" value={pw} onChange={(e) => setPW(e.target.value)} />
                    <div className="errorbox">
                        {missingPassword ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a password</label></div> : ""}
                    </div>
                    <input type="password" className="formField" id="passwordField2" name="passwordField2" placeholder="re-enter password" value={pw2} onChange={(e) => setPW2(e.target.value)} />
                    <div className="errorbox">
                        {missingConfirmPassword ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a confirmation password</label></div> : ""}
                    </div>
                    <div className="errorbox">
                        {invalidMatchingPassword ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Passwords must be matching</label></div> : ""}
                    </div>
                    <input type="date" className="formField" id="dateField" name="dateField" placeholder="birthday" value={date} onChange={(e) => setDate(e.target.value)} />
                    <div className="errorbox">
                        {missingDate ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a date</label></div> : ""}
                    </div>
                    <hr className="breakLine"/>
                    <button type='submit'  className='largeButton' >CREATE NEW ACCOUNT</button>
                    <p className="obText">
                        Returning User? &nbsp;
                        <Link to="/login" className="textLinks">Login here.</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default FillForm