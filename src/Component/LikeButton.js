import React, { useState, useEffect } from "react";
import likeButton from "../assets/heart.png";
import unlikeButton from "../assets/heart_solid.png";

const LikeButton = ({postInfo}) => {
    const [likes, setLikes] = useState(postInfo.attributes.likes);
    const [liked, setLiked] = useState(false);
    const [button, setButton] = useState(likeButton);
    const user = parseInt(sessionStorage.getItem('user'));


    // Sets button on page launch
    useEffect( () => {
            if(postInfo.attributes.likedBy.includes(user)){ 
                setButton(unlikeButton);
                setLiked(true);
            }
    },[user]);

    // Handles clicking the like or unlike button
    function handleClick() {
        if(liked) {
            postInfo.attributes.likedBy = postInfo.attributes.likedBy.filter(x => x !== user);
            postInfo.attributes.likes -= 1
            setLiked(false);
            setButton(likeButton);
            setLikes(likes - 1);
        } 
        else {
            postInfo.attributes.likedBy = [...postInfo.attributes.likedBy, user];
            postInfo.attributes.likes += 1
            setLiked(true);
            setButton(unlikeButton);
            setLikes(likes + 1);
        }

        // Submit Patch request
        let formData = new FormData();
        formData.append('uploaderID', postInfo.uploaderID);
        formData.append('attributes', JSON.stringify(postInfo.attributes));
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads/" + postInfo.id, {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: formData
        });
    }

  return (
    <div id="like-flex">
        <button id="like-button" onClick={handleClick}><img width='30px' src={button} alt="Like or Unlike"></img></button>
        <div id="like-number"><b>{likes}</b> likes</div>
    </div>
  )
}

export default LikeButton