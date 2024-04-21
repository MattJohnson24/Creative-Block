/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

import React from "react";
// import "./App.css";
import PostForm from "./Component/PostForm.jsx";
import FriendList from "./Component/FriendList.jsx";
import GroupList from "./Component/GroupList.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import Profile from "./Component/Profile.jsx";
import UserSettings from "./Component/UserSettings.jsx";
import FriendForm from "./Component/FriendForm.jsx";
import Modal from "./Component/Modal.jsx";
import Navbar from "./Component/Navbar.jsx";
import ShareContent from "./Component/ShareContent";

import ForgotForm from  "./Component/ForgotForm";
import ResetForm from  "./Component/ChangePasswordForm";

import Portfolio from "./Component/Portfolio.js";
import ViewFollowers from "./Component/ViewFollowers.jsx";
import FeaturedPage from "./Component/FeaturedPage.js";

import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

import Landing from "./Component/Landing";
import RegistrationPage from "./Component/Registration";
import { Gallery } from "./Component/Gallery";
import ProfilePicture from "./Component/ProfilePicture.jsx";
import ProfilePage from "./Component/ProfilePage.jsx";
import AboutUs from "./Component/AboutUs.jsx";
import MatthewAboutForm from "./Component/AboutUsMatthew.jsx";
import LaurenAboutForm from "./Component/AboutUsLauren.jsx";
import ElliotAboutForm from "./Component/AboutUsElliot.jsx";
import XueweiAboutForm from "./Component/AboutUsXuewei.jsx";
import AleenaAboutForm from "./Component/AboutUsAleena.jsx";


// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal
  });
}

// the App class defines the main rendering method and state information for the app
class App extends React.Component {

  // the only state held at the app level is whether or not the modal dialog
  // is currently displayed - it is hidden by default when the app is started.
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      refreshPosts: false,
      logout: false,
      login: false
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();

    // since we are passing the doRefreshPosts method to a child component, we need to 
    // bind it 
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = () =>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.setState({
      logout: true,
      login: false
    });
    
  }
  
  login = () => {
    console.log("CALLING LOGIN IN APP");
    
    this.setState({
      login: true,
      logout: false,
      refreshPosts:true
    });  
  }
  

  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts = () => {
    console.log("CALLING DOREFRESHPOSTS IN APP");
    this.setState({
      refreshPosts:true
    });
  }
  
  // This doesn't really do anything, but I included it as a placeholder, as you are likely to
  // want to do something when the app loads.  You can define listeners here, set state, load data, etc.
  componentDidMount(){
    // window.addEventListener('click', e => {console.log("TESTING EVENT LISTENER")});
  }

  // As with all react files, render is in charge of determining what shows up on the screen, 
  // and it gets called whenever an element in the state changes.  There are three main areas of the app, 
  // the navbar, the main content area, and a modal dialog that you can use for ... you know, modal
  // stuff.  It's declared at this level so that it can overlay the entire screen.
  render() {
    return (

      // the app is wrapped in a router component, that will render the
      // appropriate content based on the URL path.  Since this is a
      // single page app, it allows some degree of direct linking via the URL
      // rather than by parameters.  Note that the "empty" route "/", which has
      // the same effect as /posts, needs to go last, because it uses regular
      // expressions, and would otherwise capture all the routes.  Ask me how I
      // know this.
      // Commented out <Navbar toggleModal={e => toggleModal(this, e)} logout={this.logout}/>
      <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">

          {/* <Navbar toggleModal={e => toggleModal(this, e)} logout={this.logout}/> */}
            
          <div className="maincontent" id="mainContent">
            <Routes>
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/share" element={<ShareContent />} />
              {/* <Route path="/portfolio" element={<Portfolio />} /> */}
              <Route path="/login" element={<LoginForm  login={this.login} />} />   
              <Route path="/reset" element={<Reset login={this.login}  />} />
              <Route path="/forgot" element={<Forgot login={this.login}  />} />
              <Route path="/settings" element={<Settings login={this.login}  />} />
              <Route path="/friends" element={<Friends  login={this.login} />} />   
              <Route path="/groups" element={<Groups  login={this.login} />} />     
              <Route path="/posts" element={<Posts doRefreshPosts={this.doRefreshPosts} login={this.login} apprefresh={this.state.refreshPosts} />} />
              <Route path="/signup" id="signup" element={<RegistrationPage />} />
              <Route path="/portfolio/:id" element={<ProfilePage />} />
              <Route path="/followers" element={<ViewFollowers />} />
              <Route path="/featured" element={<FeaturedPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/Matthew" element={<MatthewAboutForm />} />
              <Route path="/Lauren" element={<LaurenAboutForm />} />
              <Route path="/Aleena" element={<AleenaAboutForm />} />
              <Route path="/Elliot" element={<ElliotAboutForm />} />
              <Route path="/Xuewei" element={<XueweiAboutForm />} />
              <Route path="/" element={<Landing />} /> 
              
            </Routes>
          </div>
        </header>

        <Modal show={this.state.openModal} onClose={e => toggleModal(this, e)}>
          This is a modal dialog!
        </Modal>
      </div>
      </Router>
    );
  }
}

/*  BEGIN ROUTE ELEMENT DEFINITIONS */
// with the latest version of react router, you need to define the contents of the route as an element.  The following define functional components
// that will appear in the routes.  


const Settings = (props) => {
  return (
    <div className="settings">
    <UserSettings userid={sessionStorage.getItem("user")} />
  </div>
  );
}

const Friends = (props) => {
   // if the user is not logged in, show the login form.  Otherwise, show the friends page
   return (
    <div>
      <p>Friends</p>
        <FriendForm userid={sessionStorage.getItem("user")} />
        <FriendList userid={sessionStorage.getItem("user")} />
    </div>
   );
}

const Groups = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the groups form
  return (
   <div>
     <p>Join a Group!</p>
       <GroupList userid={sessionStorage.getItem("user")} />
   </div>
  );
}

const Posts = (props) => {
  console.log("RENDERING POSTS");
  console.log(typeof(props.doRefreshPosts));
  

  console.log ("TEST COMPLETE");

  // if the user is not logged in, show the login form.  Otherwise, show the post form
  if (!sessionStorage.getItem("token")){
    console.log("LOGGED OUT");
    return(
      <div>
      <LoginForm login={props.login}  />
      </div>
    );
  }else{
    console.log("LOGGED IN");
    return (
      <div>
      <p>CSE 370 Social Media Test Harness</p>
      <PostForm refresh={props.apprefresh}/>
    </div>
    );
  }
}

const Login = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the settings page
      return (
      <div>
        <LoginForm/>
      </div>
      );
}

const Forgot = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the settings page
      return (
      <div>
        <ForgotForm/>
      </div>
      );
}

const Reset = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the settings page
      return (
      <div>
        <ResetForm/>
      </div>
      );
}

const Register = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the settings page
      return (
      <div>
        <RegistrationPage/>
      </div>
      );
}
/* END ROUTE ELEMENT DEFINITIONS */

// export the app for use in index.js
export default App;