import React, { useState, useEffect } from "react";
import "../styles.css";
import { GalleryPost } from "./GalleryPost";
import { Link } from "react-router-dom";
import { ThemeStrip } from "./ThemeStrip";
import galleryIcon from "../assets/picture.png";
import wandIcon from "../assets/wand.png";
import portfolioIcon from "../assets/user.png";
import usersIcon from "../assets/users.png";
import trophyIcon from "../assets/trophy.png";
import infoIcon from "../assets/info.png";

import settingsIcon from "../assets/SettingsIcon.png";
import LogoutIcon from "../assets/LogoutIcon.png";
import clearFilter from "../assets/clear-filter.png";
import { useNavigate } from "react-router-dom";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const Gallery = () => {

  const fileIDs = [];
  const uploaderID = sessionStorage.getItem("user");
  //window.location.href.substring(window.location.href.lastIndexOf("/") + 1)




  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userSet, setUserSet] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loadingPosts, setPostLoad] = useState(false);
  const [loadingUsers, setUserLoad] = useState(false);
  const [filter, setFilter] = useState({})


  // get my own Posts
  // useEffect(async () => {
    const fetchPost = async () => {
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
          // console.log(result)
          // console.log(result[0].length);

          for (var x of result[0]){
              fileIDs.push(x.id)
          }
          // console.log(fileIDs)
          

        })
        .catch(error => {
          console.error('Error:', error);
        });
        
    };
    fetchPost();
// }, []);
  const [ageCheck, setAgeCheck] = useState(false);
  // const [filter, setFilter] = useState({});
  


  // Sets filteredPosts to applied filters
  const filterHandler = (event) => {
    let { name, value } = event.target;
    if(name === "matureConfirm") {
        if(value === "mature") {
            value = true;
        }
        else {
            value = false;
        }
    }
    filter[name] = value
    setFilter(filter)
    setFilteredPosts(posts.slice(0).filter(filterPost).reverse());
  }
  
  // Fetches all the posts when page loads
  useEffect(async () => {
    const fetchPosts = async () => {
      const res = await fetch(
        `https://webdev.cse.buffalo.edu/hci/api/api/ascii/file-uploads`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      const allPosts = await res.json();
      setPosts(allPosts[0].filter(filterProfPics));
      setFilteredPosts(allPosts[0].filter(filterProfPics).reverse());
      setPostLoad(true);
    };
    fetchPosts();
  }, []);

  // Fetches all the users when page loads
  useEffect(async () => {
    const fetchUsers = async () => {
      const res = await fetch(
        `https://webdev.cse.buffalo.edu/hci/api/api/ascii/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      const allUsers = await res.json();
      filterPrivate(allUsers[0])
      setUsers(allUsers[0]);
      setUserLoad(true);
    };
    fetchUsers();
  }, []);

  // Filters out mature posts if user is underage
  useEffect(async () => {
    const checkAdult = async () => {
        if(loadingPosts & loadingUsers) {
        const user = users.find(user => user.id == sessionStorage.getItem("user"));
        filterBlocked(user);
        var birthdate = Date.parse(user.attributes.birthday);
        var today = new Date()
        var age =  Math.floor((today - birthdate)/31536000000);
        if(age < 18) {
            setPosts(posts.filter(filterMature));
            setFilteredPosts(posts.filter(filterMature).reverse());
        }
        setAgeCheck(true);
      }
    }
    checkAdult();
  }, [loadingPosts, loadingUsers]);


  // Filters out profile pics. TODO: Update API call to handle this
  function filterProfPics(post) {
    if(post.attributes.hasOwnProperty("profile")) {
      return false;
    }
    return true;
  }

  // Generates set of public users for later user
  function filterPrivate(users) {
    let output = new Set();
    for(let i=0; i < users.length; i++) {
      if (users[i].attributes.accountPrivate === "public") {
        output.add(users[i].id);
      }
    }
    setUserSet(output);
  }

  // Filter function that is called in filterHandler
  function filterPost(post) {
    for (let key in filter) {
      if(filter[key] !== post.attributes[key]){
        return false
      }
    }
    return true;
  }

  // Returns the user based on given id
  function filterUser(users, id) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i];
      }
    }
  }

  // Filters out content from blocked users
  function filterBlocked(currentUser) {
    // Verifies the attribute is set
    if(currentUser.attributes.blocked) {
      let tempSet = userSet;
      for(let i = 0; i < currentUser.attributes.blocked.length; i++) {
        tempSet.delete(parseInt(currentUser.attributes.blocked[i]));
      } 
      setUserSet(tempSet);
    }
  }

  // Filters out mature posts before page is loaded if the user is underage
  function filterMature(post) {
    if(post.attributes.matureConfirm) {
      return false;
    }
    return true;
  }
  const navigate = useNavigate();



  function handleClick() {
    // console.log("clicked");
    navigate(0);
  }
 

  var profileString = "/portfolio/" + sessionStorage.getItem("user")

  if (1 === 1) {
    return (
      <div>
        <div className="navbar">
          <Link to="/" style={{ float: "right", padding: "5px 10px 0px 10px" }} onClick={() => {sessionStorage.removeItem("token"); sessionStorage.removeItem("user")}}><img src={LogoutIcon} alt='Logout Icon'></img></Link>
          <Link to="/settings" style={{ float: "right", padding: "5px 10px 0px 10px" }}><img src={settingsIcon} alt='Settings Icon'></img></Link>
          <Link to="/gallery" className="active"><text>GALLERY</text><img className="navPic" src={galleryIcon} alt='Gallery'></img></Link>
          <Link to="/share">CREATE<img className="navPic" src={wandIcon} alt='Create Content'></img></Link>
          <Link to= {profileString}>PORTFOLIO<img className="navPic" src={portfolioIcon} alt='Portfolio'></img></Link>
          <Link to="/featured">FEATURED<img className="navPic" src={trophyIcon} alt='Featured Artists'></img></Link>
          <Link to="/followers">FOLLOWERS<img className="navPic" src={usersIcon} alt='Followers'></img></Link>
          <Link to="/about">ABOUT US<img className="navPic" src={infoIcon} alt='About Us'></img></Link>
        </div>
        <ThemeStrip />
        <div className='filter-container'>
          <form className='filter-flexbox'>
            <img src={clearFilter} onClick={handleClick} id="clear-filter-button" alt='Clear out filters'></img>
            <select className="filterDropdown" name='content_type' onChange={filterHandler}>
              <option value="" hidden id='placeholderDropDown'>Content Type</option>
              <option value="Digital Media">Digital Media</option>
              <option value="Visual Arts">Visual Arts</option>
              <option value="Photography">Photography</option>
              <option value="3D Sculpture">3D Sculpture</option>
              <option value="Mixed Media">Mixed Media</option>
            </select>
            {/* This would be a future implementation... */}
            {/* <select className="filterDropdown" name='artist' onChange={filterHandler}>
              <option value="" hidden id='placeholderDropDown'>Artists</option>
              <option value="following">Artists I Follow</option>
              <option value="featured">Featured Artists</option>
            </select> */}
            <select className="filterDropdown" name='theme' onChange={filterHandler}>
              <option value="" hidden id='placeholderDropDown'>Theme</option>
              <option value="Nature">Nature</option>
              <option value="Pets">Pets</option>
              <option value="Vintage">Vintage</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Technology">Technology</option>
            </select>
            <select className="filterDropdown" name='matureConfirm' onChange={filterHandler}>
              <option value="" hidden id='placeholderDropDown'>Maturity</option>
              <option value="mature">Mature Content</option>
              <option value="pg">Safe For Work</option>
            </select>
          </form>
        </div>
        <div className="flex-container">
          {filteredPosts.filter(post => userSet.has(post.uploaderID)).map(post => (
              <div key={post.id} className="flex-item">
                <GalleryPost postInfo={post} userInfo={filterUser(users, post.uploaderID)} checkDeletePermission={fileIDs} />
              </div>
          ))}
        </div>
        <Link to="/share">
          <button id="plusButton" >+</button>
        </Link>
      </div>
    );
  }
  else {
    return (
      <div>
      </div>
    );
  }
}


