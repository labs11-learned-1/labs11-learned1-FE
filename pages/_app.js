import App, { Container } from "next/app";
/* First we import our provider */
import StoreProvider from "../components/store";
import React from 'react';
import axios from 'axios'
import Store from '../components/store'
import { loadDB } from "../firebaseConfig/firebase";
import * as firebase from "firebase";



class MyApp extends App {
//   static async getInitialProps({req}){
// console.log(req)
// // state.userID ? dispatch({
// //   type: "LOGGED_IN",
// //   payload: result
// // }) : 
// //     const result = await axios.post("http://localhost:3344/api/login", {})

    
//   }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <style jsx global>{`
          html {
            font-family: "Roboto", "Helvetica", "Arial", sans-serif
          }
        `}</style>
        <style jsx global>{`
          body {
            margin: 0
          }
        `}</style>
        {/* Then we wrap our components with the provider */}
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </Container>
    );
  }
}

export default MyApp;
