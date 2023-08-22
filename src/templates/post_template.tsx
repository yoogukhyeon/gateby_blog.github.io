import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import Template from 'components/common/Template';
import PostHead from 'components/post/PostHead';
import { PostFrontmatterType } from 'types/postItem.types';
import PostContent from 'components/post/PostContent';
import CommentWidget from 'components/post/CommentWidget';

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]; // 존재하지 않는 타입이므로 에러가 발생하지만 일단 작성해주세요
    };
  };
};

export type PostPageItemType = {
  node: {
    html: string;
    frontmatter: PostFrontmatterType;
  };
};

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0];

  return (
    <Template>
      <PostHead title={title} date={date} categories={categories} thumbnail={gatsbyImageData} />
      <PostContent html={html} />
      <CommentWidget />
    </Template>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
