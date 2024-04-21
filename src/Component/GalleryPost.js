import CommentModal from "./CommentModal";
import React, { useState } from "react";

export const GalleryPost = ({postInfo, userInfo}) => {
    const [displayModal, setDisplayModal] = useState(false);
    const [filePermission, setFilePermission] = useState(false)
    const Toggle = () => {
        setDisplayModal(true);

        console.log(postInfo.uploaderID)
        console.log(sessionStorage.getItem("user"))
        console.log(postInfo.uploaderID == sessionStorage.getItem("user"))
        if(postInfo.uploaderID == sessionStorage.getItem("user")){
            console.log("inside if")
            setFilePermission(true)
        }
        console.log(filePermission)
    }



    const deletePost = async (fileID) => {
        
        const res = await fetch(
            `https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads/${fileID}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            }
        ).then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
          console.error('Error:', error);
        });
        window.location.reload(false);

    }


    return (
    <div className="galleryPost">
        <div className="galleryImg">
            <button className="open-modal" onClick={() => Toggle()}>
                <img width='100%' src={"https://webdev.cse.buffalo.edu" + postInfo.path} alt="Gallery Post"/>
            </button>
            <CommentModal displayModal={displayModal} setDisplayModal={setDisplayModal} postInfo={postInfo} userInfo={userInfo} deletePost={deletePost} checkDelete={filePermission}/>
        </div>
        <div className="galleryLabel">
            <p className="labelName">
                <b>{userInfo.attributes.firstname + " " + userInfo.attributes.lastname}</b> (b. {userInfo.attributes.birthday.substring(0, 4)})
            </p>
            <p className="labelTitle">
                {postInfo.attributes.title}
            </p>
            <p className="labelInfo">
                {postInfo.attributes.content_type}: {postInfo.attributes.materials}
            </p>
        </div>
    </div>
  )
}
