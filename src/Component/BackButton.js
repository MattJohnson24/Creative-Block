import React from 'react'
import backLogo from '../assets/angle-circle-left.png'
import { Link } from 'react-router-dom'

const BackButton = () => {
  return (
    <>
    <div className='backButton-div'>
            <Link to="/gallery">
                <img className="backButton" src={backLogo} alt="back button"/>
            </Link>
    </div>     
    </> 
  )
}

export default BackButton

