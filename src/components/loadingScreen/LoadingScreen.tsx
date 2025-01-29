import styled, { keyframes } from 'styled-components';
import { Urbanist } from "next/font/google";    

const urbanist = Urbanist({ 
    subsets: ["latin"], 
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] 
});

// Animación de las letras que hacen una ola
const waveAnimation = keyframes`
    0%, 40%, 100% {
        transform: translateY(0);
    }
    20% {
        transform: translateY(-20px);
    }
`;

// Estilos para la pantalla de carga completa
const FullScreenLoader = styled.div`
    display: flex;
    justify-content: end;
    align-items: end;
    height: 100vh;
    width: 100vw;
    filter: invert(1) contrast(200%);
    background-image: url("https://i.pinimg.com/originals/2a/23/d6/2a23d6dbca72cfad0bc1028fbfefc962.gif");
    background-size: cover;
    background-position: center;
    opacity: 0.85;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    transition: 1s ease-in-out;
`;

// Estilos para el contenedor del texto
const LoadingText = styled.h1`
    color: white;
    font-weight: 500;
    padding-right: 50px;
    font-size: clamp(1.8rem, 2.8vw, 3.2rem);
    display: flex;
    gap: 0.2rem;
`;

// Estilo para cada letra con animación individual
const Letter = styled.span<{ delay: number }>`
    display: inline-block;
    animation: ${waveAnimation} 1.2s ease-in-out infinite;
    animation-delay: ${({ delay }) => delay}s;
    font-family: ${urbanist.style.fontFamily};
`;

const LoadingScreen = () => {
    return (
        <FullScreenLoader>
            <LoadingText>
                {Array.from('CARGANDO...').map((letter, index) => (
                    // Cada letra con un retraso diferente
                    <Letter key={index} delay={index * 0.1}>{letter}</Letter>
                ))}
            </LoadingText>
        </FullScreenLoader>
    );
};

export default LoadingScreen;

