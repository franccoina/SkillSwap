'use client';
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OurAlertsText } from "@/src/lib/utils/ourAlertsText";
import Modal from "../../../../components/modals/ModalReport";
import { updateRequestById, getRequestsMessagesById } from "../../../api/requests";
import { FooterMain } from '@/src/components/footer/FooterMain';

// Estilos
const PageContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};

  p {
    width: 50%;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  & h1 {
    margin: 0;
    height: min-content;
    translate: 0 1rem;
    font-size: 70px;
    opacity: 0.15;
    padding-left: 1rem;
  }
`;

const PageContentContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Banner = styled.article`
  top: 0;
  padding: 20px;
  position: absolute;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgBanner};
`;

const BannerBody = styled.div`
  width: 1000px !important;
  display: flex;
  justify-content: space-between;
`;

const PagesContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;

  & h2{
    font-size: 30px;
    background: ${({ theme }) => theme.colors.gradientSecondary};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 1rem 0;
  }
`;

const Reports = styled.div`
  width: 100%;
  height: 100%;
`;

const RequestPageContainer = styled.div`
  padding: 1rem 2rem;
  padding-top: 166px;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const PageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
`;

// Estilos para los botones y el contenedor de las solicitudes
const WidgetContainer = styled.div`
  width: 50%;
  border: 1px solid ${({ theme }) => theme.colors.textBlack};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const RequestBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  & p{
    padding: 15px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  & h3{
    background: ${({ theme }) => theme.colors.gradientSecondary};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.textBlack};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 10px;
  padding: 15px;
`;

const RequestButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.textYellow};
  color: ${({ theme }) => theme.colors.textYellow};

  :hover {
    background-color: ${({ theme }) => theme.colors.bgButtonHover};
  }
`;

const ReportsText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;

  & p {
    text-align: start;
  }
`;

const RequestsText = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: end;

  & p {
    text-align: end;
  }
`;

const ReportButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.textOrange};
  color: ${({ theme }) => theme.colors.textOrange};

  & :hover {
    transform: scale(1.05)
    }
`;

const Container = styled.div`
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`

const P = styled.p`
  opacity: 0.6;
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.textYellow};
  color: ${({ theme }) => theme.colors.textYellow} !important;
  font-weight: 500;
`;

// Función para enviar la actualización del estado de la solicitud
const updateRequestState = async (idRequest: number, idStateRequest: number) => {
  try {
    const data = await updateRequestById(idRequest, idStateRequest);
    return data;
  } catch (error) {
    console.error('Error al hacer el PATCH:', error);
    throw error;
  }
};

interface ResponseItem {
  id: number;
  description: string;
  idRequestingUser: number;
  idReceivingUser: number;
  userNameReceiving: string;
  userNameRequesting: string;
}

interface ApiResponse {
  message: string;
  details: {
    text: string;
  };
  data: {
    response: ResponseItem[];
  };
}

const UserRequests = () => {
  const [requests, setRequests] = useState<ResponseItem[]>([]);
  const [userId, setUserId] = useState<number | null>(null); // Guardar el userId de manera segura
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Asegurarnos de que estamos en el cliente antes de acceder a localStorage
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        const userIdNumber = Number(storedUserId);
        console.log(userIdNumber);
        if (!isNaN(userIdNumber)) {
          setUserId(userIdNumber);
        } else {
          console.error("userId no es un número válido.");
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return;

      try {
        const response: ApiResponse = await getRequestsMessagesById(userId);
        setRequests(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleAccept = async (id: number) => {
    try {
      await updateRequestState(id, 2); // Actualizar con idStateRequest = 2 (Aceptar)
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id)); // Eliminar la solicitud aceptada
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateRequestState(id, 3); // Actualizar con idStateRequest = 3 (Rechazar)
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id)); // Eliminar la solicitud rechazada
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };

  if (loading) {
    return <OurAlertsText>Cargando...</OurAlertsText>;
  }

  return (
    <Container>
      <PageContainer>
        <Banner>
          <BannerBody>
            <h1>Social</h1>
          </BannerBody>
        </Banner>
        <PageContentContainer>
          <RequestPageContainer>
            <PagesContent>
              <RequestsText>
                <h2>Solicitudes</h2>
                <p>Revisa tus peticiones de conexión y decide con quién intercambiar conocimientos y experiencia.</p>
              </RequestsText>
              <PageBody>
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <WidgetContainer key={request.id}>
                      <RequestBody>
                        <h3>{request.userNameRequesting}</h3>
                        <p>{request.description}</p>
                      </RequestBody>
                      <ButtonsContainer>
                        <RequestButton onClick={() => handleAccept(request.id)}>ACEPTAR</RequestButton>
                        <RequestButton onClick={() => handleReject(request.id)}>RECHAZAR</RequestButton>
                      </ButtonsContainer>
                    </WidgetContainer>
                  ))
                ) : (
                  <P>◕ No hay solicitudes por responder.</P>
                )}
              </PageBody>
            </PagesContent>
            <br />
            <PagesContent>
              <ReportsText>
                <h2>Reportes</h2>
                <p>En este espacio podrás realizar reportes a usuarios con conductas sospechosas o inadecuadas.</p>
              </ReportsText>
              <Reports>
                <WidgetContainer>
                  <ReportButton onClick={openModal}>⚠︎ REPORTAR USUARIO </ReportButton>
                  <Modal isOpen={isModalOpen} onClose={closeModal} />
                </WidgetContainer>
              </Reports>
            </PagesContent>
          </RequestPageContainer>
        </PageContentContainer>
      </PageContainer>
      <FooterMain />
    </Container >
  );
};

export default UserRequests;