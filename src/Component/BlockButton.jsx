import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { element } from 'prop-types'; 
import removeuser from "../assets/block-user.png";
import editIcon from "../assets/editIcon.png";
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from './ConfirmationModal';

export default class BlockButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user :  sessionStorage.getItem("user"),
            username: "",
            email: "",
            attributes: {},
            redirect: false,
            following: false,
            connectionID: -1,
            isOpen: false
          
        };
    }

   

    async getUserDetails() {
        // const navigate = useNavigate();
        await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/${this.state.user}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                }
            })
        .then(result => result.json())
        .then(r => { 
            let attributes = r.attributes;
            if(!attributes["blocked"]){
                attributes.blocked = []
            }
            attributes.blocked.push(this.props.otherUser)
            
            this.setState({
                // email: r.email,
                attributes: attributes
            })
            
        })
        .then(_ => this.checkConnection())
        .then(_ => {
            if(this.state.following){
            this.UnfollowAction()}
        })
        .then(_ => this.block())
        
        // navigate('/gallery')
    }


    async checkConnection(){
        // console.log("CHECKING CONNECTION")
        await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections?fromUserID=${this.state.user}&toUserID=${this.props.otherUser}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
        .then(result => result.json()) 
        .then( r =>{
          
            if(r[1] >= 1){
                // console.log('SETTING CONNECTION ID')
                
                this.setState({following:true, connectionID: r[0][0].id}) 

            }

        });
      }
    async block() {
        await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/users/${this.state.user}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                // "email":this.state.email,
                "attributes":this.state.attributes
            })
        })
        .then(
            this.setState({redirect: true})
        )
        
    };

    async UnfollowAction(){
        // console.log("UNFOLLOWING")
        await fetch('https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections/'+ this.state.connectionID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem("token")
              },
           
            })

      };

    
    render() {
        let toRedirect;
        if (this.state.redirect) {
            toRedirect = <Navigate to={'/gallery'} />;
          } 
        return (
        
        <div>
            {toRedirect}

            {/* <button onClick={(e) => this.setState({ isOpen: true })}>Open Dialog</button> */}
            <button id="blockButton" onClick={(e) => this.setState({ isOpen: true })}><img src={removeuser} alt={"Block User: " + this.props.otherUser} width='100%'></img></button>

            <ConfirmationModal isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
                    <p id='block-user-text'>Are you sure you want to block this user?</p>
                    <div className='confirmation-values'>
                        <button className='smallButton' onClick={() => this.getUserDetails()}>YES</button>
                        <button className='smallButton' onClick={(e) => this.setState({ isOpen: false })}>NO</button>
                    </div>
            </ConfirmationModal>

        {/* <button id="blockButton" onClick={() => this.getUserDetails()}><img src={removeuser} alt={"Block User: " + this.props.otherUser} width='100%'></img></button>  */}
        
        </div>
        );
    }
    
}