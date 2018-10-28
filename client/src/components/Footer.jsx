import React from 'react';
import styled from 'react-emotion';

const StyledFooter = styled('footer')`
  background: #ff9933;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  text-align: center;
  line-height: 1.5rem;
  span {
    display: inline-block;
    white-space: nowrap;
  }
  a {
    color: currentColor;
  }
`;

const Footer = () => (
  <StyledFooter>
    <span>
      Created with{' '}
      <span role="img" aria-label="hearth">
        ❤️
      </span>{' '}
      by <a href="http://sirlisko.com">Luca Lischetti</a> (
      <a href="http://twitter.com/sirLisko">@sirLisko</a>
      ).
    </span>{' '}
    <span>
      View project source on{' '}
      <a href="https://github.com/sirlisko/audible-rss">Github</a>.
    </span>
  </StyledFooter>
);

export default Footer;
