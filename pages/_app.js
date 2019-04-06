import App, { Container } from 'next/app'
/* First we import our provider */
import StoreProvider from '../components/store'

class MyApp extends App {
    render () {
        const { Component, pageProps } = this.props
        
        return (
            
            <Container>
                <style jsx global>{`
                html {
                    height:100%;
                    box-sizing: border-box;
                    font-size: 62.5%;
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                }
      body {
        height: 100%;
        margin: 0;
      }

    `}</style>
                {/* Then we wrap our components with the provider */}
                <StoreProvider>
                <Component {...pageProps} />
                </StoreProvider>
            </Container>
        )
    }
}

export default MyApp