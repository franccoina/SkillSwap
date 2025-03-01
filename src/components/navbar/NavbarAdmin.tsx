'use client';
import styled from "styled-components";
import React, { useState } from "react";
import StyledNavLink from "@/src/components/ui/links/NavLinks";
import StyledIconNavLink from "../ui/links/IconNavLink";
import { handlePageChange } from "@/src/lib/utils/handlePageTheme";
import InfoIcon from "@/public/svg/InfoIcon";
import ListIcon from "@/public/svg/ListIcon";
import SettingsFloatingSidebar from "../sidebars/SidebarFloatingSettings";
import ProfileSidebar from "../sidebars/SidebarFloatingOnline";
import LogoutButton from "../ui/buttons/ButtonLogout";
import { FiLogOut } from "react-icons/fi";

// Styled components
const NavbarContainer = styled.div`
    z-index: 10;
    position: fixed;
    width: 100%;
    height: 54px;
    top: 0;
    background-color: ${({ theme }) => theme.colors.bgNavbar};
    color: ${({ theme }) => theme.colors.textWhite};
    border-bottom: 1px solid  ${({ theme }) => theme.colors.borderNavs};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    gap: 50px;

    @media (max-width: 790px) {
        padding: 0 5px;
    }
`;

const SidebarLink = styled.p`
    font-weight: 300;
    font-style: italic;
    display: flex;
    align-items: center;
    font-size: 14px;
    width: max-content;
    transition: 0.4s;
    gap: 10px;
    padding: 15px;
    color: ${({ theme }) => theme.colors.textWhite};
    cursor: pointer;

    & small {
        margin: 0;
        cursor: pointer;
        padding: 0;
    }

    &:hover {
        transform: scale(0.95);
        transition: 0.4s;
    }

    @media (max-width: 790px) {
        display: none;
    }
`;

const SidebarLinkContainer = styled.li`
    width: 100px;
    cursor: pointer;
    list-style: none;

    @media (max-width: 790px) {
        display: none;
    }
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media (max-width: 790px) {
        gap: 5px;
    }
`;

const NavList = styled.ul<{ isOpen: boolean }>`
    list-style: none;
    text-align: center;
    display: flex;
    gap: 50px;
    padding: 0;

    @media (max-width: 790px) {
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        flex-direction: column;
        align-items: start;
        height: 100%;
        width: 50%;
        position: fixed;
        margin: 0;
        top: 54px;
        left: 0;
        transition: 1s ease-in-out;
        background-color: ${({ theme }) => theme.colors.bgPrimary};
        border: 1px solid ${({ theme }) => theme.colors.borderLogobar};
        padding: 20px;
        padding-left: 8px;
        gap: 20px;
        animation: move 1s ease-in-out;
        z-index: 100;

        & a{
            font-size: 18px;
            color: ${({ theme }) => theme.colors.textSecondary} !important;
        }

        @keyframes move {
            from {
                translate: -510px;
            }

            to {
                translate: 0;
            };
        }
    }
`;

const NavItem = styled.li`
    display: inline-block;
    font-size: 15px;
    max-height: 54px;
    cursor: pointer;

        & a svg{
            width: 50px;
            height: auto;
        }
`;

const HamburgerMenu = styled.div`
    display: none;
    cursor: pointer;
    justify-content: center;

    @media (max-width: 790px) {
        display: block;
    }
`;

const BoxLogout = styled.h2`
    position: fixed;
    bottom: 54px;
    left: 20px;
    width: 40%;
    height: max-content;
    display: none;
    align-items: end !important;
    animation: appears 2s ease-in-out;

    & button {
        padding: 0;
        background: transparent;
        justify-content: start;
        color: ${({ theme }) => theme.colors.bgGray};
    }

    @media (max-width: 790px) {
        display: flex;
        align-self: end !important;
        justify-self: end !important;
    }

    @media (max-height: 380px) {
        & button {
            justify-content: end;
    }
    }

    @keyframes appears {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

// Navbar component
export const NavbarAdmin: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarSettingsOpen, setIsSidebarSettingsOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const closeSidebarSettings = () => setIsSidebarSettingsOpen(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <NavbarContainer>
            <ProfileSidebar isOpen={isModalOpen} onClose={closeModal} />
            <SettingsFloatingSidebar isOpen={isSidebarSettingsOpen} onClose={closeSidebarSettings} />
            <SidebarLinkContainer>
                <SidebarLink onClick={openModal}>+ <small>Notificaciones</small></SidebarLink>
            </SidebarLinkContainer>
            <HamburgerMenu onClick={toggleMenu}>
                <StyledIconNavLink href="#" icon={<ListIcon />} />
            </HamburgerMenu>
            <NavList isOpen={isOpen}>
                <NavItem onClick={() => handlePageChange('ADMIN/INICIO')}>
                    <StyledNavLink href="/admin/" label="INICIO" />
                </NavItem>
                <NavItem onClick={() => handlePageChange('ADMIN/USUARIOS')}>
                    <StyledNavLink href="/admin/users" label="USUARIOS" />
                </NavItem>
                <NavItem onClick={() => handlePageChange('ADMIN/REPORTES')}>
                    <StyledNavLink href="/admin/reports" label="REPORTES" />
                </NavItem>
                <NavItem onClick={() => handlePageChange('ADMIN/POSTS')}>
                    <StyledNavLink href="/admin/posts" label="POSTS" />
                </NavItem>
                <BoxLogout>
                    <LogoutButton icon={<FiLogOut />} />
                </BoxLogout>
            </NavList>
            <IconsContainer>
                <StyledIconNavLink href="/admin/legal" label="ADMIN/LEGAL" icon={<InfoIcon />} />
            </IconsContainer>
        </NavbarContainer>
    );
};