'use client';
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyling";
import { Navbar } from "../components/navbar/Navbar";
import { useTheme } from "../hooks/useTheme";
import { useThemeAuth } from "../hooks/useThemeAuth";
import { Logobar } from "../components/logobar/Logobar";
import { usePathname, useRouter } from 'next/navigation';
import { clearStorage } from "../lib/services/storageService";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import { IGlobalTheme } from "../models/globalTheme.model";

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;         
    padding: 0;
`;

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [themeAuth] = useThemeAuth();
    const [theme] = useTheme();
    const [definedTheme, setDefinedTheme] = useState<IGlobalTheme | null>(null);

    useEffect(() => {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
        setToken(storedToken);
        console.log(storedToken);

        if (!storedToken) {
            clearStorage();
        }

        const handleStart = () => setLoading(true);
        const handleComplete = () => {
            setTimeout(() => setLoading(false), 3000);
        };

        router.prefetch(pathname);

        handleStart();
        handleComplete();
    }, [pathname, router]);

    const isAuthPage = pathname === '/auth';

    useEffect(() => {
        const themeToUse = (pathname === '/auth') ? themeAuth : theme;
        setDefinedTheme(themeToUse);
    }, [themeAuth, theme, token, pathname]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!definedTheme) {
        return null;
    }

    return (
        <ThemeProvider theme={definedTheme}>
            <GlobalStyle />
            <LayoutContainer>
                {!isAuthPage && <Navbar />}
                {children}
                {!isAuthPage && <Logobar />}
            </LayoutContainer>
        </ThemeProvider>
    );
};

export default ClientLayout;
