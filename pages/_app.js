import App, { Container } from "next/app";
/* First we import our provider */
import StoreProvider from "../components/store";
import React from 'react';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <style jsx global>{`
          html {
            font-family: "Roboto", "Helvetica", "Arial", sans-serif
          }
        `}</style>
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
