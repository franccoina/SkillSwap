import React from "react";
import styled from "styled-components";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";
import CardProfileLink from "./CardProfileLink";
import { IProfileCardProps, IProfileFixedCardProps } from "@/src/models/userCards.model";

const ProfileCardContainer = styled.div`
  background: ${({ theme }) => theme.colors.bgSidebar};
  width: 100%;
  height: 95%;
  min-height: 450px !important;
  display: flex;
  margin: 1rem 0rem 2rem 1rem;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
  overflow: hidden;
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.colors.textTertiary};

  @media (max-width: 768px) {
    display: none !important;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    margin-top: 2.5rem !important;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textTertiary};
`;

const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.6rem;
  margin-bottom: 10px;
  gap: 1.5rem;
  padding-left: 1.5rem;

  .status-item {
    display: flex;
    flex-direction: column;
  }

  .status-content {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 10px;
  }

  .rejected {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textRed};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textRed};
    }
  }

  .accepted {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textBlueDark};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textBlueDark};
    }
  }

  .pending {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textSecondary};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .inbox {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textYellow};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textYellow};
    }
  }
`;

const H2StatusSection = styled.h2`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.1rem;
  font-size: 0.9rem;
`;

const ProfileCard: React.FC<IProfileFixedCardProps> = ({
  fullName,
  userSkills,
  ultimaAceptada,
  ultimaPendiente,
  ultimaCancelada,
  // ultimaRecibida,
  conteoAceptadas,
  conteoPendientes,
  conteoCanceladas,
  // conteoRecibidas
}) => {
  return (
    <ProfileCardContainer>
      <CardProfileLink
              fullName={fullName}
              userSkills={userSkills}
            />
      <StatusSection>
        <div className="status-item rejected">
          <H2StatusSection>Rejected</H2StatusSection>
          <div className="status-content">
            <FaTimes className="icon" />
            <p>
              {conteoCanceladas}: {ultimaCancelada}
            </p>
          </div>
        </div>
        <div className="status-item accepted">
          <H2StatusSection>Accepted</H2StatusSection>
          <div className="status-content">
            <FaCheck className="icon" />
            <p>
              {conteoAceptadas}: {ultimaAceptada}
            </p>
          </div>
        </div>
        <div className="status-item pending">
          <H2StatusSection>Pending</H2StatusSection>
          <div className="status-content">
            <FaClock className="icon" />
            <p>
              {conteoPendientes}: {ultimaPendiente}
            </p>
          </div>
        </div>
        <div className="status-item inbox">
          <H2StatusSection>Inbox</H2StatusSection>
          <div className="status-content">
            <FaClock className="icon" />
            <p>
              {/* {conteoRecibidas}: {ultimaRecibida} */}hola
            </p>
          </div>
        </div>
      </StatusSection>
    </ProfileCardContainer>
  );
};

export default ProfileCard;