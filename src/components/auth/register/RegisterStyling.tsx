'use client'
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px; 
  
  @media (max-width: 768px) {
    height: auto; 
    padding: 20px;
    border-radius: 0; 
  }
`;

export const DivUserData = styled.div`
  width: 100%;
  height: inherit;
  text-align: start;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const DivUserInput = styled.div`
  sub {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;

export const DivUserTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & div{
    transition: 1s ease-in-out;
  }

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const DivButtonSingUp = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  gap: 20px;
  transition: 1s ease-in-out;

  & .backBtn{
    transform: scale(0.85);
    opacity: 0.8;
    animation: appear 1s ease;

    @keyframes appear{
      from {
        transform: scale(0.01)
      }
      to {
        transform: scale(0.9);
      }
    }
  }

  @media (max-width: 1200px) {
    position: static;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
`;