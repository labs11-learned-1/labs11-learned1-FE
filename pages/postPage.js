import React from 'react';
import PostInfoPage from '../components/PostPage/post'
import { Store } from "../components/store";
import GeneralNav from "../components/Navigation/GeneralNav";

function PostPage(){
    return(
        <div>
            <GeneralNav/>
            <PostInfoPage/>
        </div>
    );
}

export default PostPage;
