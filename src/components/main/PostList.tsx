import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import PostItem from './PostItem';
import { PostListItemType } from 'types/postItem.types';
import useInfiniteScroll, { useInfiniteScrollType } from 'hooks/useInfiniteScroll';

type PostListProps = {
  selectedCategory: string;
  posts: PostListItemType[];
};

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;
  width: 100%;
  max-width: 1068px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 1070px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding: 10px 20px;
  }

  @media (max-width: 578px) {
    grid-template-columns: 1fr;
  }
`;

const PostList: FunctionComponent<PostListProps> = function ({ selectedCategory, posts }) {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(selectedCategory, posts);

  console.log('postList::::', postList);

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  );
};

export default PostList;
