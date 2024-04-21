import React from 'react'
import { useState, useEffect } from 'react'
import ProfilePicture from "./ProfilePicture.jsx";

const FeaturedArtist = ({ userID }) => {
    
    // const [username, setUsername] = useState('')
    // const 
    
    console.log(userID)
    
    
    return (
        <> 
            <ProfilePicture userID={userID}></ProfilePicture>
        </>
    )
}

export default FeaturedArtist