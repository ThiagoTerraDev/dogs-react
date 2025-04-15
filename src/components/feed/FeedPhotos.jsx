import React, { useEffect } from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import ErrorMessage from '../helper/ErrorMessage';
import Loading from '../helper/loading';
import { styled, keyframes } from 'styled-components';


const animeLeft = keyframes`
  to {
    opacity: 1;
    transform: initial;
  }
`;

const FeedPhotosStyled = styled.div`
  opacity: 0;
  transform: translateX(-20px);
  animation: ${animeLeft} 0.3s forwards;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  justify-items: center;

  li:nth-child(2) {
    grid-column: 2 / 4;
    grid-row: span 2;
  }

  @media (max-width: 40rem) {
    grid-template-columns: repeat(2, 1fr);

    li:nth-child(2) {
    grid-column: initial;
    grid-row: initial;
  }
  }
`;


const FeedPhotos = () => {

  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0});
      const { response, json } = await request(url, options);

      console.log(json);
      console.log(response);
    };

    fetchPhotos();
  }, [request]);

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Loading />;
  
  if (data) {
    return (
      <FeedPhotosStyled>
        {data.map(photo => {
          return <FeedPhotosItem key={photo.id} photo={photo} />;
        })}
      </FeedPhotosStyled>
    );
  } else {
    return null;
  }
};

export default FeedPhotos;
