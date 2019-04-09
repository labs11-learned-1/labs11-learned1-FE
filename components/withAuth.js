import React from "react";
import { loadDB } from "../firebaseConfig/firebase";
import * as firebase from "firebase";
import { renderComponent } from "recompose";
import Authentication from "./Authentication/Authentication";


 const withAuth = Component => {
  return class AuthComponent extends React.Component {
    //firebase auth state change check
    static async getInitialProps(ctx) {
        console.log("ctx", ctx)
    
    }
    constructor(props) {
      super(props);
      this.state = {
        user: this.props.user,
        isLoggedIn: false
      };
    }

    async componentDidMount() {
      let myVal = await loadDB();
      let db = myVal.firestore();

      if(this.state.user){
          firebase.auth().onAuthStateChanged(user=>{
              if(user){
                  console.log(user)
                this.setState({user: user, isLoggedIn: true})
              } else {
                  this.setState({user: null, isLoggedIn:false})
                  console.log("user signed out")
              }
          })
      }
    }
    
    render() {
       return(
       <div>
      {this.state.isLoggedIn ?  <Component {...this.props}/>  : <Authentication/>} 
      </div>
       )
    }
  };
};

export default withAuth;