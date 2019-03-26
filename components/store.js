import React from 'react'

export  const Store = React.createContext(); //creates context object

const initialState = {
    message : "Are you working?",
    loggedIn: false,
    openForm:false,
    newsfeed: [],
}

function reducer(state, action) {
    switch(action.type){
        case 'CHANGE_MESSAGE':
            return { ...state, message:"CHANGED!!!" }
        case 'LOGGED_IN':
            return { ...state, loggedIn: true }
        case 'LOGGED_OUT':
            return {...state, loggedIn: false}
        case 'FORM_TOGGLE':
            return {...state, openForm: action.payload}
        case 'SET_POSTS':
            return {...state, newsfeed: action.payload}
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