import React, { FunctionComponent, useMemo } from 'react';
import CategoryList, { CategoryListProps } from 'components/main/CategoryList';
import Introduction from 'components/main/Introduction';
import PostList from 'components/main/PostList';
import { graphql } from 'gatsby';
import { PostListItemType } from 'types/postItem.types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import queryString, { ParsedQuery } from 'query-string';
import Template from 'components/common/Template';
import styled from '@emotion/styled';
import KakaoTopAdfit from 'components/adfit/KakaoTopAdfit';
import KakaoMiddleAdfit from 'components/adfit/KakaoMiddleAdfit';
import KakaoBottomAdfit from 'components/adfit/KakaoBottomAdfit';

type IndexPageProps = {
  location: {
    search: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        image: string;
      };
    };
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
      publicURL: string;
    };
  };
};

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl, image },
    },
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string = typeof parsed.category !== 'string' || !parsed.category ? 'All' : parsed.category;

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: any,
        ) => {
          categories.forEach((category) => {
            if (list[category] === undefined) list[category] = 1;
            else list[category]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  );

  return (
    <Template title={title} description={description} url={siteUrl} image={image}>
      <Introduction profileImage={gatsbyImageData} />
      <KakaoAdfitWrap>
        <KakaoTopAdfit />
      </KakaoAdfitWrap>
      <CategoryList selectedCategory={selectedCategory} categoryList={categoryList} />
      <KakaoAdfitWrap>
        <KakaoMiddleAdfit />
      </KakaoAdfitWrap>
      <PostList selectedCategory={selectedCategory} posts={edges} />
      <KakaoAdfitWrap type={true}>
        <KakaoBottomAdfit />
      </KakaoAdfitWrap>
    </Template>
  );
};

const KakaoAdfitWrap = styled.div<{ type?: boolean }>`
  text-align: center;
  width: 100%;
  max-width: 1068px;
  margin: ${({ type }) => (type ? '0' : '30px')} auto 0;
`;

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
        image
      }
    }
    allMarkdownRemark(sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`;
