import React from 'react';
import styled from 'styled-components';


const ErrorParagraph = styled.p`
  color: #f31;
  margin: 1rem 0;
  font-size: 0.875rem;
`;

const ErrorMessage = ({ error }) => {
  return (
    <ErrorParagraph>{error}</ErrorParagraph>
  );
};

export default ErrorMessage;
