import React from 'react'
import { Link } from 'react-router-dom'
import settingsIcon from "../assets/SettingsIcon.png";
import { useState, useEffect } from "react";


const FollowingValues = (props) => {

const [followers,setFollowers] = useState([]);
const [IsFollowersSet, SetIsFollowersSet] = useState(false);

const [following, setFollowing] = useState([]);
const [IsFollowingSet, SetIsFollowingSet] = useState(false);



useEffect(async () => {
        const getFollowing = async () => {
            const res = await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections?fromUserID=${props.ProfileID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
            })
            .then(response => response.json())
            .then(result => {
                
                setFollowing(result[1]);
                SetIsFollowingSet(true);

            })
            .catch(error => {
                console.error('Error:', error);
            });
        };
    getFollowing();
}, [following]);
useEffect(async () => {
    const getFollowers = async () => {
    const res = await fetch(
        `https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections?toUserID=${props.ProfileID}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        }
    ).then(response => response.json())
    .then(result => {
    setFollowers(result[1]);
    SetIsFollowersSet(true);
    })
    .catch(error => {
    console.error('Error:', error);
    });
};
getFollowers();   
}, [followers]);

if(IsFollowersSet & IsFollowingSet){
    var linkStr = "/portfolio/" + props.ProfileID
    return(
        <div className='follow-flex'>
            <div className="follow-values">
                <b>{followers}</b><br />
                <Link className="followNumberLink" to={linkStr}>followers</Link>
            </div>
            
            <div className="follow-values">
                <b>{following}</b><br />
                <Link className="followNumberLink" to={linkStr}>following</Link>
            </div>
        </div>
    )
}
else{
    return (<div>

    </div>)
}
}
export default FollowingValues