import styled from "styled-components";

export const Container = styled.div`
  margin: 54px 0;
  flex-direction: column;
  display: flex;
  min-height: 100vh;
`;

export const DivMatch = styled.div`
  display: flex;
  justify-content: center;
  min-height: 70vh !important;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 0;
  padding: 1rem;
  gap: 1rem !important;

  // Estilos para el primer hijo
  > :first-child {
    flex: 1; 
    max-width: 33%; 
    min-width: 200px;
  }

  // Estilos para el primer hijo
  > :nth-child(2) {
    flex: 1; 
    max-width: 33%; 
    min-width: 250px;

    @media (max-width: 950px) {
      max-width: 50%;
  }

  @media (max-width: 547px) {
      min-width: 300px !important; 
  }
  }

  // Estilos para el último hijo
  > :last-child {
    flex: 1; 
    max-width: 33%;
    min-width: 250px;

    @media (max-width: 950px) {
      max-width: 50%;
  }

    @media (max-width: 547px) {
      min-width: 300px !important; 
  }
  }
`;
