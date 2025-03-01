"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import LoginPage from "../../../components/auth/login/Login";
import RegisterPage from "../../../components/auth/register/Register";
import StyledNavLink from "@/src/components/ui/links/NavLinks";
import ScrollContainer from "@/src/components/scroll/Scroll";
import { FooterMain } from "@/src/components/footer/FooterMain";

// Texto de cambio
const TextWrapper = styled.div`
  width: max-content;
  position: absolute;
  right: 15vw;
  top: -75px;
  display: flex;
  flex-direction: column;
  text-align: start;
  z-index: 100;

  @media (max-width: 1070px) {
    right: 10%;
    bottom: 10%;
    width: 100%;
    text-align: center;
    display: none;
  }
`;

const SkillSwapText = styled(motion.h1)`
  font-size: 4rem;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.gradientText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
  text-transform: uppercase;

  & span{
    font-style: normal;
  }
`;

// Contenedor principal
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  height: auto;
  margin-top: 100px;
  min-height: 70vh;

  @media (max-width: 1070px) {
    margin-top: 0 !important;
    flex-direction: column; 
    align-items: flex-start;
    justify-content: end;
    border-radius: none;
    height: 552px;
  }
`;

const MotionDiv = styled(motion.div)`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1070px) {
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: center;
    border-radius: none 
  }
`;

// Contenedor de la capa superpuesta
const OverlayContainer = styled.div`
  position: absolute;
  border: none;
  left: 50%;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 1070px) {
    position: static;
    width: 100%;
    height: auto;
    padding: 0;
  }
`;

// Panel dentro de la capa superpuesta
const OverlayPanel = styled.div`
  border: none;
  width: 60%;
  justify-content: start;
  align-items: center;

  @media (max-width: 1070px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const Div = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderAuthRight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAuthRight};
  border-right: 1px solid ${({ theme }) => theme.colors.borderAuthRight};
  background: ${({ theme }) => theme.colors.bgPrimary};
  border-radius: none;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  padding: 50px;
  width: 100%;
  height: 450px;
  text-align: start;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media (max-width: 1070px) {
    padding: 0;
    padding-top: 1.4rem;
    height: auto;
    border:0; 
  }
`;

const H1 = styled.h1`
  display: flex;
  justify-content: end;
  align-items: end;
  height: 100%;
  padding-bottom: 20px;

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 1070px) {
    justify-content: center;
    padding: 0;
    margin: 0;
  }
`;

// Botones para alternar entre vistas
const SwitchButton = styled.button`
  padding: 0 !important;
  border-radius: 20px;
  width: 150px;
  border: 1px solid ${({ theme }) => theme.colors.textYellow};
  background-color: transparent;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  & a {
    width: 100% !important;
    height: 100% !important;
    color: ${({ theme }) => theme.colors.textYellow};
    border: 0;
    padding: 10px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    border: none;

    & a:hover {
      color: ${({ theme }) => theme.colors.textWhite};
    }
  }

  @media (max-width: 1070px) {
    width: inherit; 
    padding: 0 20px !important;
    font-size: 10px;
  }
`;


export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <ScrollContainer overflowY="auto"  overflowX='hidden' marginY='30px' style={{ height: '100%' }}>
    <Container>
      {/* Framer Motion wrapper for form animations */}
      <motion.div
        initial={false}
        animate={isSignUp ? { x: "-50%" } : { x: "0%" }}
        transition={{ duration: 1 }}
        style={{
          width: "200%",
          display: "flex",
        }}
      >
        {/* Formulario de Iniciar Sesión */}
        <MotionDiv
          initial={false}
          animate={isSignUp ? { x: "200%" } : { x: "0%" }}
          transition={{ duration: 1 }}
          style={{ width: "50%" }}
        >
          <LoginPage />
        </MotionDiv>

        {/* Formulario de Registrarse */}
        <MotionDiv
          initial={false}
          animate={isSignUp ? { x: "0%" } : { x: "200%" }}
          transition={{ duration: 1 }}
          style={{ width: "50%" }}
        >
          <RegisterPage />
        </MotionDiv>
      </motion.div>

      {/* Overlay Panel */}
      <OverlayContainer>
        <TextWrapper>
          <SkillSwapText
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            SWAP
          </SkillSwapText>
          <SkillSwapText
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span>➜</span> SWAP
          </SkillSwapText>
          <SkillSwapText
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            SKILL SWAP
          </SkillSwapText>
        </TextWrapper>
        <OverlayPanel>
          <Div>
            {isSignUp ? (
              <>
                <H1>
                  <SwitchButton onClick={() => setIsSignUp(false)}>
                    <StyledNavLink href="/auth" label="INICIAR SESIÓN" />
                  </SwitchButton>
                </H1>
              </>
            ) : (
              <>
                <H1>
                  <SwitchButton onClick={() => setIsSignUp(true)}>
                    <StyledNavLink href="/auth" label="REGISTRO" />
                  </SwitchButton>
                </H1>
              </>
            )}
          </Div>
        </OverlayPanel>
      </OverlayContainer>
    </Container>
    <FooterMain/>
    </ScrollContainer>
  );
}