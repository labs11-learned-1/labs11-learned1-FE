import React from 'react'

export const Store = React.createContext(); //creates context object

const initialState = {
    loggedIn: false,
    openForm:false,
    userID: "",
    displayName: "",
    userImage: "",
    firstTimeUser: false,
    followingCount: 1,
    followerCount: 1,
    bio: "",
    webUrl: "",
    user: null
}

function reducer(state, action) {
    switch(action.type){
        case 'CHANGE_MESSAGE':
            return { ...state, message:"CHANGED!!!" }
        case 'LOGGED_IN':
            return { ...state, loggedIn: true, user: action.payload.user, userID: action.payload.id, displayName: action.payload.displayName, userImage: action.payload.image, followingCount: action.payload.followingCount, followerCount: action.payload.followerCount, bio: action.payload.bio,  webUrl: action.payload.webUrl}
        case 'LOGGED_OUT':
        localStorage.removeItem('sessionToken', state.userID)
            return {...state, loggedIn: false, }
        case 'FORM_TOGGLE':
            return {...state, openForm: action.payload}
        case 'SET_POSTS':
            return {...state, newsfeed: action.payload}
        case 'FIRST_TIME_LOGIN':
        localStorage.setItem('sessionToken', action.payload.id)
            return{
                ...state, 
                loggedIn: true, 
                user: action.payload.user,
                firstTimeUser: true,
                userID: action.payload.uid, 
                displayName: action.payload.displayName, 
                userImage: action.payload.photoURL,
            }
        case 'RETRACT_FIRST_TIME_LOGIN':
            return {...state, firstTimeUser: false}
        case 'UPDATE_DISPLAY_NAME':
            return {...state, displayName: action.payload}
        case 'UPDATE_BIO':
            return{...state, bio: action.payload}
        case 'UPDATE_WEB_URL':
            return {...state, webUrl: action.payload}
        case "UPDATE_USER_IMAGE":
            return{...state, userImage: action.payload}
        default:
            return state;
    }
}

export default function StoreProvider(props) {



    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch }; //creates an object from above statement that holds both the values
    return <Store.Provider value={value}>{props.children}</Store.Provider>
} 
// This will be the react component that will encapsulate the other components in the application. 
// It has an argument of props because that’s how we’ll get access to the other child components.
// This will be given to index.js to hold state