import "../components/bootstrap"; 
import App, { Container } from "next/app";
/* First we import our provider */
import StoreProvider from "../components/store";
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'
import {LibraryBooks} from '@material-ui/icons';
import flush from 'styled-jsx/server';

const theme = createMuiTheme({
  mixins: {
    deepBlue: '#191970',
    trapperGreen: '#0db4b9',
    pinkBoot: '#f2a1a1',
    modernPink: '#e76d89',
    lightBlue: '#9cf3f4'
  },
  overrides: {
    //This can be used to override the materialUI component styling, can get weird for some
  }
  
});

class MyApp extends App {

  render() {
  
    const { Component, pageProps } = this.props;

    toast.configure()
    return (
      <Container>
        <style jsx global>{`
          html {
            height: 100%;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            box-sizing: border-box;
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
              <ThemeProvider theme={theme}>
              {flush()}
                <Component {...pageProps} />
              </ThemeProvider>
            </StoreProvider>
          
      </Container>
      
      );
  }
}

export default MyApp;
