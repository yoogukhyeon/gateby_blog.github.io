import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const defaultStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
