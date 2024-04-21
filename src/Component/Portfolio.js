import React from 'react'
import { Link } from 'react-router-dom'
import settingsIcon from "../assets/SettingsIcon.png";
import { useState, useEffect } from "react";
import { GalleryPost } from './GalleryPost';

const Portfolio = () => {
    // const fileIDs = [];


    const uploaderID = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setPostLoad] = useState(false);

    const [user, setUser] = useState([]);
    const [loadingUser, setUserLoad] = useState(false);

    useEffect(async () => {
        const fetchPosts = async () => {
            const res = await fetch(
                `https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads?uploaderID=${uploaderID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                }
            ).then(response => response.json())
            .then(result => {
              console.log(result)
              setPosts(result[0].filter(filterProfPics));
              setPostLoad(true);
              console.log(result[0].length);

            //   for (var x of result[0]){
            //       fileIDs.push(x.id)
            //   }
            //     console.log(fileIDs)
              

            })
            .catch(error => {
              console.error('Error:', error);
            });
            
        };
        fetchPosts();
    }, []);
    
    function filterProfPics(post) {
        if(post.attributes.hasOwnProperty("profile")) {
          return false;
        }
        return true;
    }
    
    useEffect(async () => {
        const fetchUser = async () => {
            const res = await fetch(
                `https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/${uploaderID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                }
            ).then(response => response.json())
            .then(result => {
              setUser(result);
              setUserLoad(true);
            })
            .catch(error => {
              console.error('Error:', error);
            });
            // const allUsers = await res.json();
            // setUser(allUsers[0]);
            // setUserLoad(true);
            // console.log(user)
        };
        fetchUser();
    }, []);

    if (loadingPosts & loadingUser) {
        return (
            <>
                <div className="flex-container">
                    {posts.slice(0).reverse().map(post => (
                        <div key={post.id} className="flex-item">
                            <GalleryPost postInfo={post} userInfo={user} />
                        </div>
                    ))}
                </div>
            </>
        )

    }
    else{
        return (<div>

        </div>)
    }




}

export default Portfolio