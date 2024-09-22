import React from "react";
import styled from "styled-components";
import ReportForm from "../forms/FormReport";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin: 0;
  padding: 0;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPink};
  width: 60%;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  margin: 0;
  padding: 0;
`;

const ModalHeader = styled.div`
  font-size: 2rem;
  background: ${({ theme }) => theme.colors.backgroundPink};
  color: #fff;
  padding: 1rem;
  padding-left: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  span {
    color: ${({ theme }) => theme.colors.textPink};
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  font-weight: bold;
  color: #000;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const DivRoute = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #fff;
  padding: 0.5rem;
  padding-left: 1rem;
  margin: 0.8rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const ModalContent = styled.div`
  display: flex;
  margin: 1rem;
  margin-top: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const LeftSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 15px;
  padding: 1rem;
  width: 60%;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-left: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const AlertText = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
  color: #000;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    padding-right: 0.5rem;
    font-size: 1rem;
  }
`;

const PoliceInfo = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  color: #000;
  padding: 1rem;
`;

const DivAlertText = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const DivColor = styled.div`
  background: ${({ theme }) => theme.colors.backgroundGreen};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2rem;
`;

const DivTexts = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <div>
            SkillSwap <span>Safety</span>
          </div>
          <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        </ModalHeader>
        <DivRoute>C:\ User\ Documents\ SafetyTips</DivRoute>
        <ModalContent>
          {/* Left section with the report form */}
          <LeftSection>
            {/* Pasar la función onClose como prop */}
            <ReportForm closeModal={onClose} />
          </LeftSection>

          {/* Right section with warnings */}
          <RightSection>
            <DivAlertText>
              <DivColor />
              <DivTexts>
                <AlertText>
                  <span>⚠️</span> No dudes en reportar. La seguridad mutua es
                  primera.
                </AlertText>
                <AlertText>
                  <span>🔵</span> En el panel de Ayuda del User puedes ver más
                  sobre Reportes y Seguridad.
                </AlertText>
                <AlertText>
                  <span>⛔</span> Cualquier tipo de abuso o actividad ilegal nos
                  interpela a tomar medidas.
                </AlertText>
              </DivTexts>
            </DivAlertText>

            <PoliceInfo>
              Policía Nacional - CAI Virtual <br />
              Línea Nacional: 0 8000 91 1190 <br />
              Página web: cai.virtual.policia.gov.co
            </PoliceInfo>
          </RightSection>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
