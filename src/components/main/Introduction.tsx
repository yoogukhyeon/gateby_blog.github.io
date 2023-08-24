import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import ProfileImage from 'components/main/ProfileImages';
import { IGatsbyImageData } from 'gatsby-plugin-image';

type IntroductionProps = {
  profileImage: IGatsbyImageData;
};

const Background = styled.div`
  width: 100%;
  background-image: url('/images/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 60%;

  color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 1068px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: 1070px) {
    height: 350px;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Title = styled.h1`
  margin-top: 5px;
  font-size: 37px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const Introduction: FunctionComponent<IntroductionProps> = function ({ profileImage }) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} data-sal="slide-up" data-sal-duration="900" data-sal-delay="300" data-sal-easing="ease" />

        <div>
          <SubTitle data-sal="slide-up" data-sal-duration="1000" data-sal-delay="400" data-sal-easing="ease">
            축구, 야구, 농구 등 다양한 스포츠에 Hot 소식을 공유합니다.
          </SubTitle>
          <Title data-sal="slide-up" data-sal-duration="1200" data-sal-delay="500" data-sal-easing="ease">
            스포츠 뉴스 소식을 공유합니다.
          </Title>
        </div>
      </Wrapper>
    </Background>
  );
};

export default Introduction;
