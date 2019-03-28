import React from 'react';
import LearningLab from '../components/LearningLab/learningLab'
import { Store } from "../components/store";

function LearningLabPage(){
    const { state } = React.useContext(Store);
    return(
        <div>
            <LearningLab userId={state.userID}/>
        </div>
    );
}

export default LearningLabPage;