import React, { useState, useEffect } from "react";
import Comment from './Comment';



const GalleryComments = ({fileID, username}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetches all comments via API
    useEffect(async () => {
        const fetchComments = async () => {
          const queryString = encodeURIComponent('{ "path": "fileID", "equals": ' + fileID + '}')
          const res = await fetch(
            `https://webdev.cse.buffalo.edu/hci/api/api/ascii/posts?attributes=${queryString}&sort=oldest`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );
          const allComments = await res.json();
          setComments(allComments[0]);
        };
        fetchComments();
      }, [fileID]);

    // Submits comment via API
     const submitComment = async () => {
        fetch (
            `https://webdev.cse.buffalo.edu/hci/api/api/ascii/posts`,
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    authorID: sessionStorage.getItem("user"),
                    content: newComment,
                    attributes: {
                        fileID: fileID
                    }
                })
            }
            ).then(response => response.json())
            .then(result => {
                let newElem = {
                    id: result.id,
                    content: result.content,
                    author: {
                        attributes: {username: result.author.attributes.username}
                    }
                }
                setComments([...comments, newElem]);
                const comment = document.getElementById('new-comment');
                comment.value = '';
    });
    }

    useEffect(() => {
        const element = document.getElementById('comment-box');
        element.scroll({
            top: element.scrollHeight,
            left: 0,
            behavior: "smooth"
          })
      }, [comments]);

  return (
    <div>
        <div id='comment-box' className='comment-container'>
            {comments.map(comment => (
                <Comment key={comment.id} username={comment.author.attributes.username} comment={comment.content} />
            ))}
        </div>
        <input placeholder='Add your comment here...' id="new-comment" type="text"  value={newComment} onChange={(e) => {setNewComment(e.target.value)}} />
        <button type='submit' className='smallButton' onClick={submitComment}>POST</button>
    </div>
  )
}

export default GalleryComments