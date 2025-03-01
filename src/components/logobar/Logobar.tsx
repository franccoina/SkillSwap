'use client';
import styled from "styled-components";
import React from "react";

// Estilos para el Logobar Fixed a modo de pie de pagina...
const LogobarStyled = styled.div`
    z-index: 10;
    bottom: 0;
    position: fixed;
    width: 100vw;
    height:54px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    border-top: solid 1px ${({ theme }) => theme.colors.borderLogobar};

    & h1 {
        background: ${({ theme }) => theme.colors.gradientTertiary};
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

export const Logobar: React.FC = () => {
    return (
        <LogobarStyled>
            <h1>SkillSwap</h1>
        </LogobarStyled>
    );
};