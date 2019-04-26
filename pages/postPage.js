import React from 'react';
import PostInfoPage from '../components/PostPage/post'
import { Store } from "../components/store";
import GeneralNav from "../components/Navigation/GeneralNav";
import Footer from '../components/Footer/Footer'

function PostPage(){
    return(
        <div>
            <GeneralNav/>
            <PostInfoPage/>
        </div>
    );
}

export default PostPage;
