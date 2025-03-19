'use client';
import React from 'react';
import { NavbarUser } from '../../components/navbar/NavbarUser';
import styled from 'styled-components';
import { Logobar } from '@/src/components/logobar/Logobar';

const LayoutContainer = styled.div`
    display: flex;
    padding: 0;         
    margin: 0;
    flex-direction: column;
    height: 100%;
`;

const ContentContainer = styled.div`
    flex: 1; 
    overflow: auto; 
`;

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <ContentContainer>
                <NavbarUser />
                    {children}
                    <Logobar />
            </ContentContainer>
        </LayoutContainer>
    );
}

