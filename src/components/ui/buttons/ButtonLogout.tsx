'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../app/redux/slices/authSlice"; 

// Definimos los tipos de props para el componente
interface LogoutButtonProps {
  icon?: React.ReactNode;
}

const Button = styled.button`
  padding: 7px 12px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
  background-color: ${({ theme }) => theme.colors.bgNavbar};
  width:300px;

  &:hover {
    background-color:${({ theme }) => theme.colors.gradientPrimary};;
  }

  svg {
    margin-right: 10px; // Espacio entre el icono y el texto
  }
`;

const LogoutButton: React.FC<LogoutButtonProps> = ({ icon }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("clickedUserId");

    localStorage.setItem("currentPage", "AUTH");
    localStorage.setItem('theme', 'light');

    window.dispatchEvent(new Event('storage'));

    router.push("/auth");
    router.refresh();
  };

  return (
    <Button onClick={handleLogout}>
      {icon} Cerrar sesión
    </Button>
  );
};

export default LogoutButton;