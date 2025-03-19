'use client';
import React from "react";
import styled from "styled-components";

// Creación de la interfaz para el componente Select
interface SelectProps {
  id:string
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel: string;
  name: string;
  required?: boolean;
  autoComplete?: string
}

// Estilos para el elemento select usando styled-components
const SelectStyled = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

const Option = styled.option`
  padding: 1000px;
  border: 1px solid ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: 10px;
  font-size: 15px;
  width: 450px;
  height: 60px;
  box-sizing: border-box;
`;

// Componente Select
const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  className,
  disabled,
  ariaLabel,
  name,
  required = false,
  autoComplete
}) => {
  return (
    <SelectStyled
      id={id}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      name={name}
      required={required}
      autoComplete={autoComplete}
    >
      <Option value="" disabled>
        -- Selecciona una opción --
      </Option>
      <Option value="Desarrollo">Desarrollo</Option>
      <Option value="Marketing">Marketing</Option>
      <Option value="Comunicación">Comunicación</Option>
      <Option value="Diseño">Diseño</Option>
      <Option value="Entretenimiento">Entretenimiento</Option>
    </SelectStyled>
  );
};

export default Select;