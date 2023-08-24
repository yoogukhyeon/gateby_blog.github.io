import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

type CategoryItemProps = {
  active: boolean;
};

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => <Link {...props} />)<CategoryItemProps>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 21px;
  font-weight: ${({ active }) => (active ? '900' : '500')};
  color: ${({ active }) => (active ? '#11264f' : '#000')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  .count {
    font-size: 16px;
    color: #444;
  }

  @media (max-width: 1000px) {
    font-size: 18px;

    .count {
      font-size: 14px;
    }
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
export type CategoryListProps = {
  selectedCategory: string;
  categoryList: {
    [key: string]: number;
  };
};

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1068px;
  margin: 70px auto 20px;

  @media (max-width: 1070px) {
    padding: 0 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`;

const CategoryList: FunctionComponent<CategoryListProps> = function ({ selectedCategory, categoryList }) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem to={`/?category=${name}`} active={name === selectedCategory} key={name}>
          {name}
          <span className="count">({count})</span>
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
