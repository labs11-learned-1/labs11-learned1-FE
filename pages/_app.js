import App, { Container } from "next/app";
/* First we import our provider */
<<<<<<< HEAD
import StoreProvider from "../components/store";
=======
import StoreProvider from '../components/store'
>>>>>>> d2e52441063a8997df8be42e3b41bc4d026e8357
import React from 'react';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <style jsx global>{`
          body {
            margin: 0
          }
        `}</style>
        {/* Then we wrap our components with the provider */}
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </Container>
    );
  }
}

export default MyApp;
