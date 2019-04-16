import React, {useContext} from "react";
import LandingPage from "./LandingPage";
import Head from 'next/head'
export default class Home extends React.Component {
  //first instance of the database loaded into the app
  // let firebase = await loadDB();
  render() {
    return (
      <div>
      <Head>
      <script type="text/javascript" src="/static/LandingPage.js"></script>
    </Head>
 
      <LandingPage />
      </div>
    );
  }
}
