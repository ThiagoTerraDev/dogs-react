import React, { useEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import { PHOTO_GET } from '../../api';
import ErrorMessage from '../helper/ErrorMessage';
import Loading from '../helper/loading';
import PhotoContent from '../photo/PhotoContent';
import { styled } from 'styled-components';


const FeedModalStyled = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  z-index: 1000;
  padding: 2rem calc(4rem + 15px) 2rem 4rem;

  @media (max-width: 40rem) {
    padding: 2rem calc(2rem + 15px) 2rem 2rem;
  }
`;


const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();
  const modalRef = useRef();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalPhoto(null);
    };
  };

  return (
    <FeedModalStyled onClick={handleClickOutside}>
      {error && <ErrorMessage error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} modalRef={modalRef} />}
    </FeedModalStyled>
  );
};

export default FeedModal;
