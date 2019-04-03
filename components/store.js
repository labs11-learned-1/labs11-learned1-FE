import React from 'react'

export  const Store = React.createContext(); //creates context object

const initialState = {
    message : "Are you working?",
    loggedIn: false,
    userId: "",
    openForm:false,
    userID: "",
    displayName: "",
    userImage: "",
<<<<<<< HEAD
    firstTimeUser: true
=======
    
>>>>>>> e389c655fb5c70f47a0ff60698fd4082396ff3b1
}

function reducer(state, action) {
    switch(action.type){
        case 'CHANGE_MESSAGE':
            return { ...state, message:"CHANGED!!!" }
        case 'LOGGED_IN':
            return { ...state, loggedIn: true, userID: action.payload.uid, displayName: action.payload.displayName, userImage: action.payload.photoURL}
        case 'LOGGED_OUT':
            return {...state, loggedIn: false, }
        case 'FORM_TOGGLE':
            return {...state, openForm: action.payload}
        case 'SET_POSTS':
            return {...state, newsfeed: action.payload}
        case 'FIRST_TIME_LOGIN':
            return{
                ...state, 
                loggedIn: true, 
                userID: action.payload.uid, 
                displayName: action.payload.displayName, 
                userImage: action.payload.photoURL,
                firstTimeUser: true,
            }
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