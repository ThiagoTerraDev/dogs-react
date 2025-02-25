import React from 'react';
import styled from 'styled-components';


const ButtonStyled = styled.button`
  font-size: 1rem;
  font-family: var(--type--first);
  cursor: ${props => props.disabled ? 'wait' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  border: none;
  border-radius: 0.4rem;
  background: #fb1;
  color: #764701;
  min-width: 8rem;
  padding: 0.8rem 1.2rem;
  box-sizing: border-box;
  transition: 0.1s;
  &:hover {

  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #fea , 0 0 0 4px #fb1;
  }
`;


const Button = ({ children, ...props }) => {
  return (
    <ButtonStyled {...props}>{children}</ButtonStyled>
  );
};

export default Button;
