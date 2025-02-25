import React from 'react';
import styled from 'styled-components';


const InputWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const LabelStyled = styled.label`
  font-size: 1rem;
  display: block;
  line-height: 1;
  padding-bottom: 0.5rem;
`;

const InputStyled = styled.input`
  border: 1px solid #eee;
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background: #eee;
  transition: 0.2s;
  &:hover {
  
  }
  &:focus { 
    outline: none;
    border-color: #fb1;
    background: white;
    box-shadow: 0 0 0 3px #fea;
  }
`;

const ErrorMessage = styled.p`
  color: #f31;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;


const Input = ({ label, type, name, value, onChange }) => {
  return (
    <InputWrapper>
      <LabelStyled htmlFor={name}>{label}</LabelStyled>
      <InputStyled 
        id={name}
        type={type} 
        label={label}
        value={value}
        onChange={onChange} />
      <ErrorMessage>Error</ErrorMessage>
    </InputWrapper>
  );
};

export default Input;
