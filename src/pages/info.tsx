import React from 'react';
import { graphql } from 'gatsby';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
const info = ({ data }: any) => {
  const {
    siteMetadata: { title, description, author },
  } = data.site;

  return (
    <div>
      <Global styles={globalStyle} />
      <Text1 disable={true}>{title}</Text1>
      <Text1 disable={true}>{description}</Text1>
      <Text1>{author}</Text1>
    </div>
  );
};

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 20px;
  }
`;

const Text1 = styled.span<{ disable?: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${({ disable }) => (disable ? 'line-through' : 'none')};
`;
export default info;
