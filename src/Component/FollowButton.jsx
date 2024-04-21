import React from 'react';
import { Link } from "react-router-dom"


export default class FollowButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          Follow : true,
          thisUser :  sessionStorage.getItem("user"),
          connectionID: -1,
          followingCount: -1
        };
        this.handleClick = this.handleClick.bind(this);
    }
    async getConnectionToDelete(){
      await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections?fromUserID=${this.state.thisUser}&toUserID=${this.props.OtherUser}`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem("token")
          }
      })
      .then(result => result.json()) 
      .then( response =>{
        let connection = response[0][0]
        console.log(connection.id)
        
        this.setState({connectionID: connection.id})
        console.log("conID set to:" + this.state.connectionID)
      })
      
    }


      
    getConnection(){
      fetch(`https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections?fromUserID=${this.state.thisUser}&toUserID=${this.props.OtherUser}`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem("token")
          }
      })
      .then(result => result.json()) 
      .then( r =>{
        
        this.setState({followingCount:r[1]})
        if(this.state.followingCount >= 1){
        this.setState({Follow:false}) }
        
      } );
    }
            
      componentDidMount() {
        
        this.getConnection()
      }



      async followAction(){
        console.log(this.state.thisUser);

        await fetch('https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem("token")
          },
        body: JSON.stringify({"fromUserID": this.state.thisUser,"toUserID": this.props.OtherUser,"attributes": {"additionalProp1": {}}})
        })
        this.setState({followingCount: 1})
        this.setState({Follow:false})
        window.location.reload();
      }


      async UnfollowAction(){
        console.log("calling getCon");
        await this.getConnectionToDelete();
        console.log("after getCon");
        await fetch('https://webdev.cse.buffalo.edu/hci/api/api/ascii/connections/'+ this.state.connectionID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem("token")
              },
           
            })
            this.setState({Follow:true})
            window.location.reload();
      }

      async handleClick() {
      if(this.state.Follow){

        this.followAction()
      }else{
        this.UnfollowAction()
        }
        
        
      }
    render() {

            if(this.props.OtherUser == this.state.thisUser){return(<div></div>)}
      
            return (
              
              <div className="follow-button">
                <button onClick={this.handleClick} className="largeButton" >{this.state.Follow ? 'FOLLOW' : 'UNFOLLOW'}</button>
              </div>
            ) 
        
        
      }
}



