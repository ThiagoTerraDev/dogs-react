import React from 'react';
import { styled } from 'styled-components';
import ViewIcon from '../../assets/visualizacao.svg?react';


const PhotoItem = styled.li`
  list-style: none;
  display: grid;
  border-radius: 0.2rem;
  overflow: hidden;
  cursor: pointer;

  img {
    grid-area: 1 / 1;
  }

  span {
    grid-area: 1 / 1;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 1rem;
    text-align: center;
    display: none;
    align-items: center;
    justify-content: center;
  }

  &:hover span {
    display: flex;
  }
`;

const ViewIconStyled = styled(ViewIcon)`
  display: inline-block;
  margin-right: 0.25rem;
`;


const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  return (
    <PhotoItem onClick={() => setModalPhoto(photo)}>
      <img src={photo.src} alt={photo.title} />
      <span>
        <ViewIconStyled />
        {photo.acessos}
      </span>
    </PhotoItem>
  );
};

export default FeedPhotosItem;
