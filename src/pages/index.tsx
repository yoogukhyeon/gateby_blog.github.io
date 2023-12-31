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
import TenpingTop from 'components/tenping/TenpingTop';
import TenpingMiddle from 'components/tenping/TenpingMiddle';
import TenpingBootom from 'components/tenping/TenpingBootom';

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
  const goToScore = () => {
    window.open('https://everyday-365.com/kr', '_blank');
  };

  return (
    <Template title={title} description={description} url={siteUrl} image={image}>
      <Introduction profileImage={gatsbyImageData} />
      <EverydayBg onClick={goToScore}></EverydayBg>
      <KakaoAdfitWrap>
        <TenpingTop />
      </KakaoAdfitWrap>
      <CategoryList selectedCategory={selectedCategory} categoryList={categoryList} />
      <KakaoAdfitWrap>
        <TenpingMiddle />
      </KakaoAdfitWrap>
      <PostList selectedCategory={selectedCategory} posts={edges} />
      <KakaoAdfitWrap type={true}>
        <TenpingBootom />
      </KakaoAdfitWrap>
    </Template>
  );
};

const EverydayBg = styled.div`
  width: 100%;
  height: 80px;
  background-image: url('/images/everyday_banner.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 60%;
  background-color: #000000;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 50px;
  }
`;

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
