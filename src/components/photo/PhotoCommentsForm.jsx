import React, { useState } from 'react';
import SendButton from '../../assets/enviar.svg?react';
import useFetch from '../../hooks/useFetch';
import { COMMENT_POST } from '../../api';
import ErrorMessage from '../helper/ErrorMessage';
import { styled, keyframes } from 'styled-components';


const PhotoCommentsFormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: stretch;
  margin: 1rem;
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  border: 1px solid #eee;
  font-size: 1rem;
  font-family: var(--type-first);
  resize: none;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background: #eee;
  transition: 0.2s;

  &:focus, &:hover {
    outline: none;
    border-color: #fb1;
    background: #fff;
    box-shadow: 0 0 0 3px #fea;
  }
`;

const Bark = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  color: #333;
  background: transparent;
  font-size: 1rem;
  padding: 0 1rem;
  overflow: hidden;

  &:focus, &:hover {
    outline: none;
  }

  &:focus svg path, &:hover svg path {
    fill: #fea;
    stroke: #fb1;
  }

  &:focus svg g, &:hover svg g {
    animation: ${Bark} 0.6s infinite;
  }
`;


const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = useState('');
  const { request, error } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  };

  return (
    <PhotoCommentsFormStyled onSubmit={handleSubmit}>
      <TextArea 
        id='comment' 
        name='comment'
        placeholder='Add a comment...'
        value={comment}
        onChange={({target}) => setComment(target.value)}
      />
      <Button>
        <SendButton />
      </Button>
      {error && <ErrorMessage error={error} />}
    </PhotoCommentsFormStyled>
  );
};

export default PhotoCommentsForm;
