import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Input from '../forms/Input';
import Button from '../forms/Button';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { PHOTO_POST } from '../../api';
import ErrorMessage from '../helper/ErrorMessage';
import { useNavigate } from 'react-router-dom';


const animeLeft = keyframes`
  to {
    opacity: 1;
    transform: initial;
  }
`;

const AnimateLeftSection = styled.section`
  opacity: 0;
  transform: translateX(-20px);
  animation: ${animeLeft} 0.3s forwards;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  #img {
    margin-bottom: 1rem;
  }
`;

const PreviewImage = styled.div`
  background-image: url(${(props) => props.preview});
  border-radius: 1rem;
  background-size: cover;
  background-position: center center;
  height: 100%;

  &::after {
    content: '';
    display: block;
    height: 0px;
    padding-bottom: 100%;
  }
`;

const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm('number');
  const age = useForm('number');
  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate('/account');
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('img', img.raw);
    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);

    const token = localStorage.getItem('token');

    const { url, options } = PHOTO_POST(formData, token);

    request(url, options);
  };

  const handleImgChange = (e) => {
    setImg({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  return (
    <AnimateLeftSection>
      <form onSubmit={handleSubmit}>
        <Input 
          label='Name' 
          type='text'
          name='name'
          {...name}
        />
        <Input 
          label='Weight' 
          type='number'
          name='weight'
          {...weight}
        />
        <Input 
          label='Age' 
          type='number'
          name='age'
          {...age}
        />
        <input 
          type='file' 
          name='img'
          id='img'
          onChange={handleImgChange} 
        />
        {loading ? (
          <Button disabled>Posting...</Button>
        ) : (
          <Button>Post</Button>
        )}    
        <ErrorMessage error={error} />
      </form>
      <div>
        {img.preview && <PreviewImage preview={img.preview}></PreviewImage>}
      </div>
    </AnimateLeftSection>
  );
};

export default UserPhotoPost;
