import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PhotoComments from './PhotoComments';
import ViewIcon from '../../assets/visualizacao-black.svg?react';
import { styled, keyframes } from 'styled-components';
import { UserContext } from '../../UserContext';
import PhotoDelete from './PhotoDelete';


const scaleUp = keyframes`
  to {
    opacity: 1;
    transform: initial;
  }
`;

const PhotoStyled = styled.div`
  margin: auto;
  height: 36rem;
  border-radius: 0.2rem;
  background: white;
  display: grid;
  grid-template-columns: 36rem 20rem;
  grid-template-rows: auto 1fr auto;
  opacity: 0;
  transform: scale(0.8);
  animation: ${scaleUp} 0.2s forwards;

  @media (max-width: 64rem) {
    height: auto;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    grid-template-columns: minmax(20rem, 40rem);
  }
`;

const PhotoImg = styled.div`
  grid-row: 1 / 4;

  @media (max-width: 64rem) {
    grid-row: 1;
  }
`;

const PhotoDetails = styled.div`
  padding: 2rem 2rem 0 2rem;
`;

const MetaInfo = styled.p`
  opacity: 0.5;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a:hover {
    text-decoration: underline;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
`;

const ViewIconStyled = styled(ViewIcon)`
  margin-right: 0.25rem;
`;

const Attributes = styled.ul`
  display: flex;
  font-size: 1.125rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 2rem;

  li {
    margin-right: 2rem;
  }

  li::before {
    content: '';
    display: inline-block;
    height: 20px;
    margin-right: 0.5rem;
    position: relative;
    top: 3px;
    width: 2px;
    background: #333;
    margin-top: 5px;
  }
`;


const PhotoContent = ({ data, modalRef }) => {
  const user = useContext(UserContext);
  const { photo, comments } = data;

  return (
    <PhotoStyled ref={modalRef}>
      <PhotoImg>
        <img src={photo.src} alt={photo.title} />
      </PhotoImg>
      <PhotoDetails>
        <div>
          <MetaInfo>
            {user.data && user.data.username === photo.author ? 
              <PhotoDelete id={photo.id} /> :
              <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
            }
            <span>
              <ViewIconStyled />
              {photo.acessos}
            </span>
          </MetaInfo>
          <h1>
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </h1>
          <Attributes>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} {photo.idade === 1 ? 'ano' : 'anos'}</li>
          </Attributes>
        </div>
      </PhotoDetails>
      <PhotoComments id={photo.id} comments={comments} />
    </PhotoStyled>
  );
};

export default PhotoContent;
