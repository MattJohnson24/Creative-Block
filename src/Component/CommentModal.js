import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import exitIcon from "../assets/exit_white.png";
import deleteIcon from "../assets/trash.png"
import GalleryComments from './GalleryComments';
import LikeButton from './LikeButton';

const CommentModal = ({ displayModal, setDisplayModal, postInfo, userInfo, deletePost, checkDelete }) => {
    const Toggle = () => setDisplayModal(!displayModal);
    console.log(checkDelete)

    return (
        <>
            {
                displayModal ?
                    <div className="modal">                            
                           
                        <div className="modal-content" >
                            <button onClick={() => Toggle()} className="close" >
                                <img src={exitIcon} alt="close" />
                            </button>

                            <div className='modal-flex'>
                                <div className='modal-left'>
                                    <div className="galleryPost">
                                        <div className="galleryImg">
                                            <img src={"https://webdev.cse.buffalo.edu" + postInfo.path} alt="Gallery Post" width="100%" />
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
                                    <div className='modal-likes'>
                                        <LikeButton postInfo={postInfo} />
                                    </div>
                                </div>
                                <div className='modal-right'>
                                    <div className="modal-info">
                                        <h1 className="modal-header"><b>Artist Portfolio: </b><Link to={"/portfolio/" + userInfo.id}>{userInfo.attributes.username}</Link></h1>
                                        <h1 className="modal-header"><b>Theme: </b>{postInfo.attributes.theme}</h1>
                                        <h1 className="modal-header"><b>Comments: </b></h1>
                                    </div>
                                    <div className='modal-comments'>
                                        <GalleryComments fileID={postInfo.id} username={userInfo.attributes.username} />
                                    </div>
                                {checkDelete ?
                                        <div id='delete-post'>
                                            <button className="smallButton" id="delete-button" onClick={() => deletePost(postInfo.id)} >
                                                <img src={deleteIcon} alt="delete post" width='25px' />
                                                DELETE POST
                                            </button> 
                                        </div> 
                                    : null}
                                </div>

                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    );
};


export default CommentModal;