
import React, { Component } from 'react'

/* First we will make a new context */
export const StoreContext = React.createContext()

/* Then create a provider Component */
class StoreProvider extends Component {
  state = {
    loginStatus: false
  }

  updateLogin = () => {
      this.setState({loginStatus: !this.state.loginStatus})
  }

  render () {
    return (
      <StoreContext.Provider
        value={{
          loginStatus: this.state.loginStatus,
          updateLogin: this.updateLogin
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}

/* then make a consumer which will surface it */
const StoreConsumer = StoreContext.Consumer

export default StoreProvider
export { StoreConsumer }