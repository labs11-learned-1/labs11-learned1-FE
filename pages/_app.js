import App, { Container } from 'next/app'
/* First we import our provider */
<<<<<<< HEAD
import StoreProvider from '../components/StoreProvider'

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        {/* Then we wrap our components with the provider */}
        <StoreProvider>
          <Component/>
        </StoreProvider>
      </Container>
    )
  }
=======
import StoreProvider from '../components/store'

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
>>>>>>> bd56c4975a9cead47f5ebc12f14372483507263d
}

export default MyApp