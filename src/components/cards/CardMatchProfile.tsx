'use client';
import styled from "styled-components";
import { FaCheck, FaTimes, FaClock, FaArrowUp } from "react-icons/fa";
import CardProfileLink from "./CardProfileLink";
import { IRequestCardProps, IUserCardProps } from "@/src/models/userCards.model";
import { getRequestById, getUsersForImages } from "@/src/app/api/users";
import React, { useEffect, useState } from "react";
import { OurAlertsText } from "@/src/lib/utils/ourAlertsText";

const ProfileCardContainer = styled.div`
  background: ${({ theme }) => theme.colors.bgSidebar};
  width: 100%;
  min-height: 100% !important;
  max-height: 75vh !important;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.textBlack};

  @media (max-width: 950px) {
    display: none !important;
  }
`;

const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7rem;
  margin-bottom: 10px;
  gap: 1rem;
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
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textRed};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textRed};
    }
  }

  .accepted {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textBlueDark};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textBlueDark};
    }
  }

  .sent {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textSecondary};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .inbox {
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textOrange};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textOrange};
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

const ProfileCard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserCardProps | null>(null);
  const [userMetrics, setUserMetrics] = useState<IRequestCardProps>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Función para obtener el ID del usuario del localStorage
      const getCurrentIdUser = (): number => {
        const idString = localStorage.getItem("userId");
        return parseInt(idString!, 10);
      };

      const idNumberCurrentUser = getCurrentIdUser();

      const fetchPeople = async () => {
        if (!idNumberCurrentUser) {
          setError("No se pudo obtener el ID del usuario.");
          setLoading(false);
          return;
        }

        try {
          const metricsResponse = await getRequestById(idNumberCurrentUser);
          const userDataResponse = await getUsersForImages();

          if (metricsResponse && userDataResponse) {
            setUserMetrics(metricsResponse);
            const matchedUser = userDataResponse.find((user) => user.id === idNumberCurrentUser);
            setUserData(matchedUser!);
          } else {
            setError('Error al cargar los datos');
          }

          setLoading(false);
        } catch (error) {
          console.log(error);
          setError("Error al cargar los datos");
          setLoading(false);
        }
      };

      fetchPeople();
    }
  }, []);

  if (loading) {
    return <OurAlertsText>Cargando...</OurAlertsText>;
  }

  if (error) {
    return <OurAlertsText>Error: {error}</OurAlertsText>;
  }

  return (
    <ProfileCardContainer>
      <CardProfileLink
        userData={userData!}
      />
      <StatusSection>
      <div className="status-item inbox">
          <H2StatusSection>Recibidas</H2StatusSection>
          <div className="status-content">
            <FaClock className="icon" />
            <p>
              {userMetrics!.solicitudes.conteoPendientes}: {userMetrics!.solicitudes.ultimaPendiente}
            </p>
          </div>
        </div>
        <div className="status-item accepted">
          <H2StatusSection>Aceptadas</H2StatusSection>
          <div className="status-content">
            <FaCheck className="icon" />
            <p>
              {userMetrics!.solicitudes.conteoAceptadas}: {userMetrics!.solicitudes.ultimaAceptada}
            </p>
          </div>
        </div>
        <div className="status-item rejected">
          <H2StatusSection>Rechazadas</H2StatusSection>
          <div className="status-content">
            <FaTimes className="icon" />
            <p>
              {userMetrics!.solicitudes.conteoCanceladas}: {userMetrics!.solicitudes.ultimaCancelada}
            </p>
          </div>
        </div>
        <div className="status-item sent">
          <H2StatusSection>Enviadas</H2StatusSection>
          <div className="status-content">
            <FaArrowUp className="icon" />
            <p>
              {userMetrics!.solicitudes.conteoEnviadas}: {userMetrics!.solicitudes.ultimoEnviado}
            </p>
          </div>
        </div>
      </StatusSection>
    </ProfileCardContainer>
  );
};

export default ProfileCard;