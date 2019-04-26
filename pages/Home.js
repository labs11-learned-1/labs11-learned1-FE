import React from 'react';
import LearningLab from '../components/LearningLab/learningLab'
import { Store } from "../components/store";
import GeneralNav from '../components/Navigation/GeneralNav'
import Footer from '../components/Footer/Footer'

function LearningLabPage(){
    const { state } = React.useContext(Store);
    return(
        <div style={{height:"100%", background: "#E6ECF0"}}>
            <GeneralNav />
            <LearningLab userId={state.userID}/>
        </div>
    );
}

export default LearningLabPage;
