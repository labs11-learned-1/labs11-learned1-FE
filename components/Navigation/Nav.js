import React, {useContext, useState} from 'react';
import { Store } from "../store";
import LandingNav from './LandingNav';
import GeneralNav from './GeneralNav';
//import Router from 'next/router'
// import * as firebase from "firebase";


const Navigation  = () => {

    const {state, dispatch} = useContext(Store);

    if (!state.loggedIn) {
        return (
            <LandingNav/>
        );
      } else {
        return (
            <GeneralNav/>
        );
      }
  }


  
export default Navigation;