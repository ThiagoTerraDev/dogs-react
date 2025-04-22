import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import { styled } from 'styled-components';


const PhotoCommentsStyled = styled.ul`
  overflow-y: auto;
  word-break: break-word;
  padding: 0 2rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
`;


const PhotoComments = (props) => {
  const { login } = useContext(UserContext);
  const [comments, setComments] = useState(() => props.comments);
  const commentsSection = useRef(null);

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  },[comments]);

  return (
    <>
      <PhotoCommentsStyled ref={commentsSection}>
        {comments.map(comment => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
          ))}
      </PhotoCommentsStyled>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments} /> }
    </>
  );
};

export default PhotoComments;
