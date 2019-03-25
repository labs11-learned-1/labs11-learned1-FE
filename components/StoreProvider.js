
import React, { Component, useReducer } from 'react'

/* First we will make a new context */
let reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, loginStatus: !state.loginStatus};
    default:
      return;
  }
};

const initialState = {
  loginStatus: false
}

export const StoreContext = React.createContext(initialState)
/* Then create a provider Component */
function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);


    return (
      <StoreContext.Provider
        value={{state,dispatch}}
      >
        {props.children}
      </StoreContext.Provider>
    )
}

/* then make a consumer which will surface it */

export default StoreProvider