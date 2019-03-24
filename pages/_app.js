import App, { Container } from 'next/app'
/* First we import our provider */
import StoreProvider from '../components/StoreProvider'

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        {/* Then we wrap our components with the provider */}
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </Container>
    )
  }
}

export default MyApp