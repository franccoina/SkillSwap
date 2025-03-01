'use client';
import styled from "styled-components";
import React from "react";

const PageWrapper = styled.div`
    margin-top: 72px;
`;

const FooterContainer = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 0.5rem ;

    @media (max-width: 768px) {
        padding: 8px 0;
    }
`;

const FooterText = styled.p`
    font-size: 0.875rem;
    margin: 0;
    padding: 20px 0;
    width: 50%;
    min-width: 180px;
    border-top: 1px solid ${({ theme }) => theme.colors.bgGray};
    color: ${({ theme }) => theme.colors.bgGray};

    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`;

export const FooterMain: React.FC = () => {
    return (
        <PageWrapper>
            <FooterContainer>
                <FooterText>© {new Date().getFullYear()} SkillSwap, Inc. Todos los derechos reservados.</FooterText>
            </FooterContainer>
        </PageWrapper>
    );
};
