"use client";
import styled from "styled-components";
import Carousel from "../components/ui/carousel/Carousel";
import { useRouter } from "next/navigation";
import { FooterOffline } from "../components/footer/FooterOffline";
import hands_swap from "../../public/img/hands-swap.webp";
import Image from "next/image";

// ---------------------- Estilos para el contenedor principal ---------------------
const HomeContainer = styled.div`
  padding: 0;
  padding-top: 74px;
  padding-bottom: 54px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// Estilos para el logo y el botón
const Logo = styled.h1`
  background: ${({ theme }) => theme.colors.gradientText};
  font-size: 12vw;
  margin-top: 0.57em;
  margin-bottom: 0.4em;
  font-weight: bold;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; 

  @media (max-width: 768px) {
    padding: 20px 0;
  }
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

  & a{
    color: ${({ theme }) => theme.colors.textOrange};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    transition: 0.5s ease-in-out;

    & a{
      color: ${({ theme }) => theme.colors.textWhite};
  }
  }

  @media (max-width: 768px) {
    padding: 10px 45px;
    font-size: 10px;
  }
`;

// Estilos para el texto principal
const MainText = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15vw;
  background: transparent;
  align-items: end;
  padding: 50px;
  padding-bottom: 5vw;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

// Estilos para cada cuadro de texto
const Text = styled.div`
  display: flex;
  flex: 1;
  text-align: start;
  padding: 45px;
  background: transparent;
  background: ${({ theme }) => theme.colors.gradientText};
  font-weight: bold;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;   
  width: 50%;
  border: 4px solid ${({ theme }) => theme.colors.textYellow};
  align-items: end;

  &:first-child {
    border-right: 1px solid transparent ;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
  }

  &:last-child {
    border-left: px solid transparent;
  }

  & h2 {
    font-size: 4vw;
  }
;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;

    & h2 {
      font-size: 6vw;
    }
  }
`;

const Text2 = styled.div`
  flex: 1;
  text-align: center;
  padding: 50px;
  background: transparent;
  font-size: 27px;
  width: 50%;
  border: 4px solid ${({ theme }) => theme.colors.textSecondary};
  text-align: end;

  &:first-child {
    border-right: 1px solid transparent;
  }

  &:last-child {
    border-left: 1px solid transparent;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }

  & h2 {
    font-size: 4vw;
    color:${({ theme }) => theme.colors.textSecondary};
  }
;
  @media (max-width: 768px) {
    padding: 0;
    padding-left: 20px;
    padding-bottom: 25px;
    width: 100%;
    border: none;

    & h2 {
      font-size: 6vw;
    }
  }
`;

//--------------------- estilos para section 2 ---------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding: 10vw 100px;
  gap: 50px;

  @media (max-width: 768px) {
    padding: 100px 20px;
    gap: 80px;
  }
`;

const Section1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Section2 = styled.div`
  filter: grayscale();
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  border-radius: 10px;
  font-weight: 100;
  color: ${({ theme }) => theme.colors.textOrange2};

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Section3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const BoxTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: end;
  width: 25%;
  margin-right: 100px;

  @media (max-width: 1200px) {
    width: 100%;
    margin-right: 0;
    text-align: center;
    justify-content: center;
  }
`;

const Title = styled.h1`
  background: ${({ theme }) => theme.colors.gradientText};
  font-size: 2.5rem;
  font-weight: normal;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1424px) {
    font-size: 2rem;
  }

  @media (max-width: 1200px) {
    display: none
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  padding: 30px 100px 30px 50px;
  border-radius: 10px;
  text-align: start;
  align-items: start;
  justify-content: flex-start;
  transition: 1s;
  width:50%;

  &:hover{
    transition: 1s;
    transform: scale(1.05);
  }

  @media (max-width: 1070px) {
    width: 100%;
  }
`;

const ProfileBox2 = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.textOrange2};
  padding: 30px 100px 30px 50px;
  border-radius: 10px;
  text-align: start;
  align-items: start;
  justify-content: flex-start;
  transition: 1s;
  width: 50%;

  &:hover{
    transition: 1s;
    transform: scale(1.05);
  }

  @media (max-width: 1070px) {
    width: 100vw;
    border-radius: 0;
  }
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Message2 = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.bgSecondary};

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  color:${({ theme }) => theme.colors.bgSecondary};;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px !important;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const TagButton = styled.button`
  background-color: transparent;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.bgBanner};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  transition: 1s;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 8px 12px;
  }

  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.colors.bgBanner};
    border: none;
    transition: 1s;
  }
`;

//--------------------- estilos para section 4 ---------------------

const ContainerDiscover = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  padding: 10vw 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-left: 4px solid ${({ theme }) => theme.colors.textYellow};
  padding-left: 50px;

  @media (max-width: 768px) {
    padding-left: 20px;
    border-left: 4px solid ${({ theme }) => theme.colors.textYellow};
  }
`;

const RightSection = styled.div`
  text-align: right;
  justify-content: center;

  @media (max-width: 768px) {
    text-align: end;
  }
`;

const SwapText = styled.h1`
  font-size: clamp(2rem, 10vw, 12rem);
  background: ${({ theme }) => theme.colors.gradientText};
  font-weight: bold;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; 
  color: transparent;
  margin: 0;
`;

const SubText = styled.p`
  font-size: clamp(10px, 2vw, 2rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textYellow};
  margin: 10px 0 30px;
  font-style: italic;
`;

const AuthButton = styled(Button)`
  color: ${({ theme }) => theme.colors.textYellow};
  border: ${({ theme }) => theme.colors.textYellow} 1px solid;
  display:flex;
  justify-content:center;
  align-items: center;
  margin-bottom: 10px;
  width: 20%;

  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;

const RightTextLine1 = styled.div`
  padding-right: 50px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(2rem, 8vw, 8rem);
  font-weight: 100;
`;

const RightTextLine2 = styled.div`
  border-right: 4px solid ${({ theme }) => theme.colors.textSecondary};
  padding-right: 50px;
  font-size: clamp(2rem, 8vw, 8rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
`;

const RightTextLine3 = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  border-right: 4px solid ${({ theme }) => theme.colors.textSecondary};
  padding-right: 50px;
  font-size: clamp(2rem, 8vw, 8rem);
  font-weight: 800;
`;

const Imagenes = styled(Image)`
  height: 100vw;
  width: 100vw;
  position: absolute;
  top: -31.5vw;
  transform: rotate(-90deg);
  filter: grayscale();

  @media (max-width: 1024px) {
    top: -29.5vw;
  }

  @media (max-width: 900px) {
    top: -28.5vw;
  }

  @media (max-width: 800px) {
    top: -27.5vw;
  }

  @media (max-width: 769px) {
    top: -23.5vw;
  }

  @media (max-width: 669px) {
    top: -21.5vw;
  }

  @media (max-width: 569px) {
    top: -18.5vw;
  }

  @media (max-width: 469px) {
    top: -15vw;
  }

  @media (max-width: 369px) {
    top: -9.5vw;
  }

  @media (max-width: 320px) {
    top: -5.5vw;
  }
`;

//--------------------- Componente principal de la página de inicio ---------------------

const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/auth')
  }
  return (
    <HomeContainer>
      <Imagenes src={hands_swap} alt='swap-hands'></Imagenes>
      <Logo>
        SkillSwap
      </Logo>
      <MainText>
        <Text>
          <h2>LOOKING FOR <br></br>SKILL</h2>
        </Text>
        <Text2>
          <h2 className="right-text">INTERCAMBIA <br></br> <span>experiencias</span>  & <br></br><span>destrezas</span> </h2>
        </Text2>
      </MainText>
      <Carousel>
      </Carousel>
      <Container>
        {/* Profile Section 1 */}
        <Section1>
          <ProfileBox>
            <Name>Diane Ressler</Name>
            <Message>¡Hola Jorge! ¿Podrías enseñarme un poco sobre CSS?</Message>
            <ButtonGroup>
              <TagButton>Design</TagButton>
              <TagButton>Adobe</TagButton>
              <TagButton>Branding</TagButton>
            </ButtonGroup>
          </ProfileBox>
        </Section1>
        <Section2>
          <BoxTitle>
            <Title>TODO SEGÚN TUS NECESIDADES E INTERESES</Title>
          </BoxTitle>
          <ProfileBox2>
            <Name>Jorge Torres</Name>
            <Message2>¡Claro! Y luego podrías ayudarme a mejorar en Diseño y Redes.</Message2>
            <ButtonGroup>
              <TagButton>Coding</TagButton>
              <TagButton>HTML</TagButton>
              <TagButton>JavaScript</TagButton>
            </ButtonGroup>
          </ProfileBox2>
        </Section2>
        <Section3>
          <ProfileBox>
            <Name>Sara Castillo</Name>
            <Message>Hey, soy creadora de contenido. Me gustaría aprender Coding contigo.</Message>
            <ButtonGroup>
              <TagButton>Entretenimiento</TagButton>
              <TagButton>Manejo Redes</TagButton>
            </ButtonGroup>
          </ProfileBox>
        </Section3>
      </Container>
      <ContainerDiscover>
        {/* Left Section */}
        <LeftSection>
          <div>
            <SwapText>Swap.</SwapText>
            <SubText>simple. dinámico. libre.</SubText>
          </div>
          <AuthButton onClick={handleClick}>AUTENTICARSE</AuthButton>
        </LeftSection>
        {/* Right Section */}
        <RightSection>
          <RightTextLine1>PARA</RightTextLine1>
          <RightTextLine1>LOS</RightTextLine1>
          <RightTextLine2>QUE</RightTextLine2>
          <RightTextLine2>VIVEN</RightTextLine2>
          <RightTextLine3>DIGITAL</RightTextLine3>
          <RightTextLine3>MENTE</RightTextLine3>
        </RightSection>
      </ContainerDiscover>
      <FooterOffline />
    </HomeContainer>
  );
};

export default Home;