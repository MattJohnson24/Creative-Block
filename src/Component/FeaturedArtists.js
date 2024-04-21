import React from 'react'
import { useState, useEffect } from 'react'
import FeaturedArtist from './FeaturedArtist';
// import ProfileInfo from './ProfileInfo';
import { Link } from 'react-router-dom';
import first from "../assets/first_place.png";
import second from "../assets/second_place.png";
import third from "../assets/third_place.png";


const FeaturedArtists = () => {
    const [userSet, setUserSet] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setPostLoad] = useState(false);
    const [artists, setArtists] = useState([]);
    const [loadArtists, setLoadArtists] = useState(false);

    const [user1, setUser1] = useState([]);
    const [user1load, setUser1Load] = useState(false)
    const [user2, setUser2] = useState([]);
    const [user2load, setUser2Load] = useState(false)
    const [user3, setUser3] = useState([]);
    const [user3load, setUser3Load] = useState(false)


    const [loadingUsers, setUserLoad] = useState(false);
    const [userInfos, setUserInfos] = useState([]);
    const [loadUserInfos, setLoadUserInfos] = useState(false);


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
            setPosts(allPosts[0].filter(filterProfPics).filter(filterTheme));
            //   setFilteredPosts(allPosts[0].filter(filterProfPics).reverse());
            setPostLoad(true);
        };
        fetchPosts();
    }, []);

    function filterProfPics(post) {
        if (post.attributes.hasOwnProperty("profile")) {
            return false;
        }
        return true;
    }
    function filterTheme(post) {
        if (post.attributes.theme != "Pets") {
            return false;
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
    // Generates set of public users for later user
    function filterPrivate(users) {
        let output = new Set();
        for (let i = 0; i < users.length; i++) {
            if (users[i].attributes.accountPrivate === "public") {
                output.add(users[i].id);
            }
        }
        setUserSet(output);
    }

    console.log(posts)




    useEffect(async () => {

        const findFeatured = () => {
            const artist_library = {};
            const topThree = [];
            if (loadingPosts) {
                for (var post in posts) {

                    console.log(posts[post])
                    var postInfo = posts[post]
                    if (artist_library.hasOwnProperty(postInfo.uploaderID)) {
                        if (postInfo.attributes.contest) {
                            if (postInfo.attributes.likes > artist_library[postInfo.uploaderID]) {
                                artist_library[postInfo.uploaderID] = postInfo.attributes.likes
                            }
                        }


                    } else {
                        if (postInfo.attributes.contest) {
                            artist_library[postInfo.uploaderID] = postInfo.attributes.likes
                        }
                    }
                }
                console.log(artist_library)
                let entries = Object.entries(artist_library)
                let sorted = entries.sort((a, b) => b[1] - a[1])
                console.log(sorted)



                for (let i = 0; i < 3; i++) {
                    console.log(sorted[i][0])
                    var userID = sorted[i][0]
                    topThree.push(userID)

                }
                setArtists(old => [...old, ...topThree])
                setLoadArtists(true)
            }
        };
        findFeatured();
    }, [posts, loadingPosts]);

    // Fetches all the users when page loads
    useEffect(async () => {
        const fetchUsers = async (index, userID) => {

            if (!userID) {
                return
            }
            const res = await fetch(
                `https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/${userID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                }
            );
            const allUsers = await res.json();
            console.log(allUsers[0])
            // filterPrivate(allUsers[0])
            if (index == 0) {
                setUser1(allUsers)
                setUser1Load(true)
            } else if (index == 1) {
                setUser2(allUsers)
                setUser2Load(true)
            } else {
                setUser3(allUsers)
                setUser3Load(true)
            }
        };
        if (loadArtists) {
            fetchUsers(0, artists[0]);
            fetchUsers(1, artists[1]);
            fetchUsers(2, artists[2]);
        }

    }, [loadArtists, artists]);
    console.log(user1)
    console.log(user1load)


    // console.log(artists)
    // useEffect(async () => {
    //     const grabUsers = () => {
    //         const users_arr = [];
    //         console.log(loadingUsers)
    //         console.log(loadArtists)
    //         if (loadingUsers && artists.length == 3) {

    //             for (var userID in artists) {
    //                 console.log(userID)
    //                 var user = filterUser(users, userID)
    //                 users_arr.push(user)
    //             }
    //             setUserInfos(old => [...old, ...users_arr])
    //             setLoadUserInfos(true)
    //         }
    //     };
    //     grabUsers();
    // }, [loadingUsers, loadArtists]);
    // console.log(userInfos)



    return (
        <>
            {artists.length > 0 && loadArtists ?
                <div className='featured-flex'>
                    <div className='featured-artists'>
                        <img className='medals' src={first} alt='First Place'></img>
                        <FeaturedArtist userID={artists[0]} />
                        {user1load ? <h1><b>Artist Portfolio: </b><Link to={"/portfolio/" + artists[0]}>{user1.attributes.username}</Link></h1>
                            : null}
                    </div>
                    <div className='featured-artists'>
                        <img className='medals' src={second} alt='Second Place'></img>
                        <FeaturedArtist userID={artists[1]} />
                        {user2load ? <h1><b>Artist Portfolio: </b><Link to={"/portfolio/" + artists[1]}>{user2.attributes.username}</Link></h1>
                            : null}
                    </div>
                    <div className='featured-artists'>
                        <img className='medals' src={third} alt='Third Place'></img>
                        <FeaturedArtist userID={artists[2]} />
                        {user3load ? <h1><b>Artist Portfolio: </b><Link to={"/portfolio/" + artists[2]}>{user3.attributes.username}</Link></h1>
                            : null}
                    </div>
                </div> : null
            }

            <div className='references'> 
                Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> 
                from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a>
            </div>
        </>
    )
}

export default FeaturedArtists