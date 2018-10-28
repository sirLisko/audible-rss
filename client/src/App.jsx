import React, { Component } from 'react';
import styled from 'react-emotion';
import { injectGlobal } from 'emotion';

import { ReactComponent as ItalianFlag } from 'svg-country-flags/svg/it.svg';
import { ReactComponent as Logo } from './assets/logo.svg';

import Footer from './components/Footer';

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Avenir Next';
    font-size: 16px;
    margin: 0;
  }
`;

const StyledContainer = styled('section')`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10rem;
`;

const StyledTitle = styled('h1')`
  text-align: center;
  font-size: 2.5rem;
  svg {
    width: 50px;
    height: auto;
  }
`;

const StyledSubtitle = styled('div')`
  text-align: center;
  padding: 0 1rem;
`;

const StyledLink = styled('a')`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ff9933;
  border-radius: 4px;
  margin: 3rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  color: currentColor;
  text-decoration: none;
  transition: color 300ms ease;
  &:hover {
    color: #ff9933;
  }
  svg {
    width: 25px;
    margin-right: 1rem;
  }
`;

class App extends Component {
  render() {
    return (
      <StyledContainer>
        <div>
          <StyledTitle>
            Audible RSS <Logo />
          </StyledTitle>
          <StyledSubtitle>
            Get an RSS feed of the latest audiobook relases on Audible.
          </StyledSubtitle>
          <StyledLink href="/it">
            <ItalianFlag /> Audible.it Feed
          </StyledLink>
        </div>
        <Footer />
      </StyledContainer>
    );
  }
}

export default App;
