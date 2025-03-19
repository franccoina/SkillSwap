'use client';
import React from "react";
import styled from "styled-components";

// Creación de la interfaz para el componente TextArea
interface TextAreaProps {
  id:string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number; 
  autoComplete?: string
}

// Estilos para el textarea usando styled-components
const TextAreaStyled = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textWhite};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  height: 80px; 
  box-sizing: border-box;
  resize: none;
  &::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textWhite}!important;// Ajusta la opacidad si es necesario
  } 

  @media (max-width: 1070px) {
    height: 100px; 
  }
`;

// Componente TextArea
const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  onChange,
  className,
  disabled,
  ariaLabel,
  name,
  placeholder,
  required = false,
  maxLength = 200, 
  autoComplete
}) => {
  return (
    <TextAreaStyled
      id={id}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      name={name}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength} 
      autoComplete={autoComplete}
    />
  );
};

export default TextArea;
