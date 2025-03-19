import styled from "styled-components";
import SkillTag from "../ui/skillTag/skillTag";
import ScrollContainer from "../scroll/Scroll";

// Estilos para el contenedor general de la tarjeta
const CardContainer = styled.div`
  width: 100%;
  min-height: 100% !important;
  max-height: 75vh !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 0;
  border: 1px solid ${({ theme }) => theme.colors.textBlack};
  border-radius: 0.5rem;
  overflow: hidden;

  > * {
    width: 100% !important;
  }

  @media (max-width: 547px) {
    max-height: 100% !important;
  }
`;

const DivCardContent = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 60% !important;
  }

  > :nth-child(2){
    border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary} !important;
  }
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: start;
  gap: 2rem;
  text-align: center;
  padding: 1rem;

  & h1 {
    font-size: 2.8rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.textTertiary};
    font-weight: bold;
  }

  & p {
    width: 100%;
    font-size: 0.9rem !important;
    font-weight: 500;
    margin: 0;
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const ConnectionsSection = styled.div`
  padding: 7px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textTertiary};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.textBlack};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textBlack};
  font-size: 0.8rem;
  font-weight: 500;
  width:100%;
  margin: 0;
`;

const DivRate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & p {
    text-align: start;
    width: 100%;
  }
`;

const RatingStars = styled.div`
  opacity: 0.7;
  gap: 5px;
  display: flex;
`;

const Star = styled.span`
  color: ${({ theme }) => theme.colors.textYellow};
  font-size: 16px;
  font-style: normal;
`;

const Description = styled.div`
  text-align: end;
  padding: 0;
  padding-bottom: 1rem;
`;

const SkillsSection = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: bold;
`;

const SubTitle = styled.h4`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-weight: 500;
  padding: 0 1rem;
  margin: 0;
  margin-top: 1rem;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 300;
  padding: 0;
  margin: 0;
  margin-top: 0.3rem;
  padding: 0 1rem;
`;

interface CardProps {
  description: string;
  rating: number;
  countMatches: number;
  skills: string[];
}

const MatchCard: React.FC<CardProps> = ({ description, skills, rating, countMatches }) => {
  return (
    <CardContainer>
      <ScrollContainer overflowY="auto" overflowX='auto' marginY="5px" style={{ maxHeight: '100%' }}>
      <ConnectionsSection>
  Este perfil ha conectado con {isNaN(countMatches) ? 0 : countMatches} {countMatches === 1 ? "persona" : "personas"}.
</ConnectionsSection>
        <DivCardContent>
          <RatingSection>
            <h1>{(Math.floor(rating * 10)) / 10}</h1>
            <DivRate>
              <p>Calificación</p>
              <RatingStars>
                {[...Array(5)].map((_, index) => {
                  const stars = Math.floor(rating);
                  return (
                    <Star key={index}>
                      {index < stars ? "★" : "☆"}
                    </Star>
                  );
                })}
              </RatingStars>
            </DivRate>
          </RatingSection>

          <Description>
            <SubTitle>Descripción</SubTitle>
            <P>{description}</P>
          </Description>

          <SkillsSection>
            <SubTitle>Skills</SubTitle>
            <SkillTag skillsArray={skills} />
          </SkillsSection>
        </DivCardContent>
      </ScrollContainer>
    </CardContainer>
  );
};

export default MatchCard;
