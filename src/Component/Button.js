import React from 'react'
import '../styles.css'


const Button = ({type, onClick}) => {

    return (
    <>
    <button type={type} className="smallButton" role="button">CREATE</button>
    </>
    )
}




export default Button