import App, { Container } from "next/app";
/* First we import our provider */
import StoreProvider from "../components/store";
import React from 'react';


class MyApp extends App {

  render() {
    console.log("tis is props", this.props, "endprops\n")
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <style jsx global>{`
          html {
            height: 100%;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            
          }
          
        `}</style>
        <style jsx global>{`
          body {
            margin: 0;
            min-height: 100%;
            background: rgb(230, 236, 240);
            
          }
          #__next {
            height: 100%;
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
