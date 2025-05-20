import React from 'react';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../hooks/useFetch';
import styled from 'styled-components';


const PhotoDeleteButton = styled.button`
  background: #ddd;
  padding: 0.3rem 0.6rem;
  line-height: 1;
  border: 1px solid transparent;
  font-size: 0.875rem;
  font-family: var(--type-first);
  cursor: pointer;
  border-radius: 0.4rem;
  transition: 0.1s;

  &:focus,
  &:hover {
    outline: none;
    background: white;
    box-shadow: 0 0 0 3px #eee;
    border-color: #333;
  }
`;

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  const handleClick = async () => {
    const confirmation = window.confirm('Do you really want to delete this photo?');

    if (confirmation) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  };

  return (
    <>
      {loading ? (
        <PhotoDeleteButton disabled>Deleting...</PhotoDeleteButton>
      ) : (
        <PhotoDeleteButton onClick={handleClick}>Delete</PhotoDeleteButton>
      )}
    </>
  );
};

export default PhotoDelete;
