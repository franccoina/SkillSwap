'use client';
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaCheck, FaTimes, FaClock, FaArrowUp } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"
import CardProfileLink from "../../components/cards/CardProfileLink";
import LogoutButton from "../ui/buttons/ButtonLogout";
import { IUserCardProps } from "@/src/models/userCards.model";
import { OurAlertsText } from "@/src/lib/utils/ourAlertsText";
import { getRequestById } from "../../app/api/requests";
import { getUsersForImages } from "../../app/api/users"

const OnlineSidebarContainer = styled.div`
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.bgMainOpacity};
    width: 100%;
    height: 100%;
    animation: appear 1s ease-in-out;
    
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const OnlineSidebarContent = styled.div`
    z-index: 1;
    background: ${({ theme }) => theme.colors.bgSidebar};
    width: 300px !important;
    height: 70%;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    margin-left: 20px;
    overflow: hidden;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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

    @media (max-height: 500px) {
      height: 60% !important;
    }
`;

const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7rem;
  margin-bottom: 10px;
  gap: 0.9rem;
  padding-left: 2rem;

  @media (max-height: 500px) {
    display:none;
  }

  .status-item {
    display: flex;
    flex-direction: column;
  }

  .status-content {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 8px;
  }

  .rejected {
    @media (max-height: 510px) {
    display:none;
  }

    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textRed};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textRed};
    }
  }

  .sent {
    @media (max-height: 580px) {
    display:none;
  }
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.textSecondary};

    & p {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
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
  color: ${({ theme }) => theme.colors.textSidebar};
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.1rem;
  font-size: 0.8rem;
`;

const BoxLogout = styled.h2`
  position: fixed;
  display: flex;
  align-items: end !important;
  height: 70%;
  left: 20px;
  animation: appearBottom 2s ease-in-out;

  @keyframes appearBottom {
    from {
      translate: 0 500px;
    }
    to {
      translate: 0 0;
    }
  }

  @media (max-height: 600px) {
      height: 66% !important;
    }

    @media (max-height: 500px) {
      height: 55% !important;
    }
`;
interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IUserSolicitudes {
  conteoCanceladas: number;
  ultimaCancelada: string | null;
  conteoAceptadas: number;
  ultimaAceptada: string | null;
  conteoEnviadas: number;
  ultimoEnviado: string | null;
  conteoPendientes: number;
  ultimaPendiente: string | null;
}

interface IUserData {
  id: number;
  nombreUsuario: string;
  solicitudes: IUserSolicitudes;
}


const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [userMetrics, setUserMetrics] = useState<IUserCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const idString = localStorage.getItem('userId');
      const idNumber = idString ? parseInt(idString, 10) : null;

      if (!idNumber) {
        setError('ID de usuario no encontrado');
        setLoading(false);
        return;
      }

      try {
        const userData = await getRequestById(idNumber);
        const metricsData = await getUsersForImages();

        if (userData && metricsData) {
          setUserData(userData);
          const matchedUser = metricsData.find((user) => user.id === idNumber);
          setUserMetrics(!matchedUser ? null : matchedUser);
          console.log(userData)
        } else {
          setError('Error al cargar los datos');
        }
      } catch (err) {
        setError('Hubo un problema con la solicitud');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log(error)

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

  if (!isOpen) return null;

  if (loading) return <OurAlertsText>Cargando...</OurAlertsText>;

  return (
    <OnlineSidebarContainer>
      <OnlineSidebarContent ref={sidebarRef}>
        {userData && userMetrics && (
          <>
            <CardProfileLink
              userData={userMetrics}
            />
            <StatusSection>
            <div className="status-item inbox">
                <H2StatusSection>Recibidas</H2StatusSection>
                <div className="status-content">
                  <FaClock className="icon" />
                  <p>
                    {userData.solicitudes.conteoPendientes}:{" "}
                    {userData.solicitudes.ultimaPendiente ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="status-item accepted">
                <H2StatusSection>Aceptadas</H2StatusSection>
                <div className="status-content">
                  <FaCheck className="icon" />
                  <p>
                    {userData.solicitudes.conteoAceptadas}:{" "}
                    {userData.solicitudes.ultimaAceptada ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="status-item rejected">
                <H2StatusSection>Rechazadas</H2StatusSection>
                <div className="status-content">
                  <FaTimes className="icon" />
                  <p>
                    {userData.solicitudes.conteoCanceladas}:{" "}
                    {userData.solicitudes.ultimaCancelada ?? "N/A"}
                  </p>
                </div>
              </div>
              <div className="status-item sent">
                <H2StatusSection>Enviadas</H2StatusSection>
                <div className="status-content">
                  <FaArrowUp className="icon" />
                  <p>
                    {userData.solicitudes.conteoEnviadas}:{" "}
                    {userData.solicitudes.ultimoEnviado ?? "N/A"}
                  </p>
                </div>
              </div>
            </StatusSection>
          </>
        )}
        <BoxLogout>
          <LogoutButton icon={<FiLogOut />} />
        </BoxLogout>
      </OnlineSidebarContent>
    </OnlineSidebarContainer>
  );
};

export default ProfileSidebar;