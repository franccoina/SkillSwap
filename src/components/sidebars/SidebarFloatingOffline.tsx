import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { handlePageChange } from "../../lib/utils/handlePageTheme";
import StyledNavLink from "../ui/links/NavLinks";

const OfflineSidebarContainer = styled.div<{ isOpen: boolean }>`
  z-index: 1000;
  top: 0;
  left: 0;
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; 
  align-items: center;
  background: ${({ theme }) => theme.colors.bgMainOpacity};
  width: 100%;
  height: 100%;
  animation: ${({ isOpen }) => (isOpen ? "appear 1s ease-in-out" : "none")};

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OfflineSidebarContent = styled.div`
  z-index: 1;
  background: ${({ theme }) => theme.colors.bgSidebar};
  width: 300px !important;
  height: 75%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  margin-left: 20px;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  animation: move-right 1s ease-in-out;

  @keyframes move-right {
    from {
      translate: -510px;
    }
    to {
      translate: 0;
    }
  }

  @media (max-width: 370px) {
    width: 250px !important;
  }
`;

const Disclaimer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  margin-bottom: 10px;
  padding: 2rem;
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.textSidebar};
  font-weight: 500;
  margin: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

const OfflineProfile = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;

  @media (max-height: 400px) {
    display: none;
  }
`;

const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const Avatar = styled.div<{ urlImage: string }>`
  filter: brightness(95%);
  background-image: url(${(props) => props.urlImage}); 
  background-size: cover;
  background-position: center;
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
`;

const ProfileName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.colors.gradientText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; 
`;

const Skills = styled.div`
  opacity: 0.5;
  font-size: 0.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
display: flex;
  justify-content: center;
  width: 100px;
  background: transparent;
  border: ${({ theme }) => theme.colors.textOrange} 1px solid;
  padding: 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  margin: 30px 0;
  border-radius: 10px;
  opacity: 0.7;

  & a{
    padding: 0;
    color: ${({ theme }) => theme.colors.textOrange};
  }

  &:hover {
    opacity: 0.7;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    transition: 0.5s ease-in-out;

    & a{
      color: ${({ theme }) => theme.colors.textWhite};
  }
  }
`;

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <OfflineSidebarContainer isOpen={isOpen}>
      <OfflineSidebarContent ref={sidebarRef}>
        <Disclaimer>
          <OfflineProfile>
            <ProfileHeader>
              <Avatar urlImage={"https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"} />
              <div>
                <ProfileName>Offline</ProfileName>
                <Skills>
                  <li>Oops!</li>
                </Skills>
              </div>
            </ProfileHeader>
          </OfflineProfile>
          <H2>Atrévete a hacer parte de nuestras <strong>Comunidades</strong>.</H2>
          <Button onClick={() => handlePageChange('INICIAR SESIÓN')}>
            <StyledNavLink href="/auth" label="COMENZAR" />
          </Button>
        </Disclaimer>
      </OfflineSidebarContent>
    </OfflineSidebarContainer>
  );
};

export default ProfileSidebar;