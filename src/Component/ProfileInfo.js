import React, { useState, useEffect } from "react";

const ProfileInfo = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userBio, setUserBio] = useState('');
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(async () => {
        var url_id = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
        // fetch user from database using user's id
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/" + url_id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        }).then(response => response.json())
        .then(result => {
            setFirstname(result.attributes.firstname);
            setLastname(result.attributes.lastname);
            setUsername(result.attributes.username);
            setUserBio(result.attributes.userBio);
            setLoadingUser(true);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);


    if(loadingUser) {
        return(
            <>
                <div className="profileInfo">
                    <h2>{username}</h2>
                    <h3>{firstname + " " + lastname}</h3>
                    <p>{userBio}</p>
                </div>
                <br></br>
            </>
        );
    } else {
        return(<></>)
    }
}

export default ProfileInfo