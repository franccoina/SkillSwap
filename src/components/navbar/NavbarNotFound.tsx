'use client';
import styled from "styled-components";
import React from "react";
import StyledIconNavLink from "../ui/links/IconNavLink";
import InfoIcon from "@/public/svg/InfoIcon";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../app/redux/slices/authSlice"; 

// Styled components
const NavbarContainer = styled.div`
    z-index: 11;
    position: fixed;
    width: 100%;
    height: 54px;
    top: 0;
    background-color: ${({ theme }) => theme.colors.bgNavbar};
    color: ${({ theme }) => theme.colors.textWhite};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    border-bottom: 1px solid  ${({ theme }) => theme.colors.borderNavs};

    @media (max-width: 768px) {
        padding: 0 5px;
    }
`;

const AuthLink = styled.p`
    font-weight: 300;
    font-style: italic;
    display: flex;
    align-items: center;
    font-size: 14px;
    width: max-content;
    transition: 0.4s;
    gap: 10px;

    & small {
        margin: 0;
        padding: 0;
        color: ${({ theme }) => theme.colors.textWhite};
    }

    &:hover {
        transition: 0.4s;
    }
`;

const BackLink = styled.p`
    font-weight: 300;
    font-style: italic;
    display: flex;
    align-items: center;
    font-size: 14px;
    width: max-content;
    transition: 0.4s;
    gap: 10px;

    & small {
        margin: 0;
        padding: 0;
        color: ${({ theme }) => theme.colors.textWhite};
    }

    &:hover {
        transition: 0.4s;
    }
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;


    > * {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        gap: 5px;
    }
`;

// Navbar component
export const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <NavbarContainer>
            <StyledIconNavLink href="#" icon={
                <BackLink onClick={(e) => {
                    e.preventDefault();
                    router.back();
                }}>
                    <small>Ir atrás</small>
                </BackLink>
            } />
            <IconsContainer>
                <StyledIconNavLink onClick={() => {
                    dispatch(logoutUser());
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("clickedUserId");
                
                    localStorage.setItem("currentPage", "AUTH");
                    localStorage.setItem('theme', 'light');
                
                    window.dispatchEvent(new Event('storage'));
                }} href="/auth" label="AUTH" icon={
                    <AuthLink><small>Iniciar Sesión</small></AuthLink>
                } />
                <StyledIconNavLink href="/legal" label="LEGAL" icon={<InfoIcon />} />
            </IconsContainer>
        </NavbarContainer>
    );
};

