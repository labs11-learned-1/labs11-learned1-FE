import React, {useContext} from "react";
import LandingPage from "./LandingPage";

export default class Home extends React.Component {
  //first instance of the database loaded into the app
  // let firebase = await loadDB();
  render() {
    return (
      <div>
      <LandingPage />
      </div>
    );
  }
}
