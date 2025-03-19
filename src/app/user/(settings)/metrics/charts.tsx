"use client"
import WidgetContainer from '@/src/components/containers/WidgetContainer/WidgetContainer';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from "../../../../components/modals/ModalTips"

const PageContainer = styled.section`
  width: 100%;
  height: 100%;
  margin: 54px 0;
  display: flex;
  position: relative;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};

  & h1 {
      margin: 0;
      height: min-content;
      translate: 0 30px;
      font-size: 100px;
      opacity: 0.15;
      padding-left: 1.7rem;
    }

  & h2 {
      margin: 0;
      padding-bottom: 10px;
      margin-bottom: 20px;
      width: 70%;
      font-size: 40px;
      border-bottom: 2px solid  ${({ theme }) => theme.colors.textYellow};
      background: ${({ theme }) => theme.colors.gradientSecondary};
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

  & h3 {
      margin: 0;
      padding: 10px 30px;
      width: 100% !important;
      font-size: 25px;
      border-bottom: 1px solid  ${({ theme }) => theme.colors.textBlack};
    }

  & h4 {
      margin: 0;
      margin-bottom: 10px;
      width: 100%;
      font-size: 25px;
    }

  & p{
      margin: 0;
      width: 100%;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

//Container for page.tsx content
const PageContentContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

//Containers for banner
const Banner = styled.article`
  top: 0;
  padding: 20px;
  position: absolute;
  width: 100%;
  height:200px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgBanner};
`;

const BannerBody = styled.div`
    width: 1000px !important;
    display: flex;
    justify-content: space-between;
`

//Container for INFO content
const InfoPageContainer = styled.div`
  padding-top: 200px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const PageContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const PageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2rem;
`;

//Containers for Widgets and Aside
const WidgetBody = styled.div`
  padding: 20px 30px;
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;

const SecurityButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};

  & :hover {
    transform: scale(1.05)
    }
`;

const Security = styled.div`
  width: 50%;
  height: 100%;
`;

interface IUser {
  idUsuario: number;
  nombreUsuario: string;
  solicitudes: Request;
}

interface Request {
  ultimaAceptada: string;
  ultimaPendiente: string;
  ultimaCancelada: string;
  ultimoEnviado: string;
  conteoConexiones: number;
  conteoAceptadas: number;
  conteoPendientes: number;
  conteoCanceladas: number;
  conteoEnviadas: number;
}

const Metrics: React.FC = () => {
  const [requestData, setRequestData] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userIdString = localStorage.getItem('userId');
      const userId = userIdString ? Number(userIdString) : null;

      if (userId === null) {
        setError('ID de usuario no encontrado');
        setLoading(false);
        return;
      }

      const fetchRequestData = async () => {
        try {
          const response = await fetch(`https://skillswapriwi.azurewebsites.net/api/RequestsGet/GetRequestById/${userId}`, {
            method: 'GET',
            headers: {
              'accept': '*/*',
            },
          });

          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }

          const data = await response.json();
          setRequestData(data.data.response);
        } catch (err) {
          setError(err as string);
        } finally {
          setLoading(false);
        }
      };

      fetchRequestData();
    }
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageContainer>
      <Banner>
        <BannerBody>
          <h1>Metricas</h1>
        </BannerBody>
      </Banner>
      <PageContentContainer>
        <InfoPageContainer>
          <PageContent>
            <PageBody>
              <h2>{requestData?.nombreUsuario}</h2>
              <WidgetContainer>
                <WidgetBody>
                  <h4>Ultima Aceptada</h4>{requestData?.solicitudes.ultimaAceptada} <br />
                  <br />
                  <h4>Ultima Pendeinete</h4>{requestData?.solicitudes.ultimaPendiente} <br />
                  <br />
                  <h4>Última Cancelada: </h4>{requestData?.solicitudes.ultimaCancelada ?? 'N/A'} <br />
                  <br />
                  <h4>Último Enviado: </h4>{requestData?.solicitudes.ultimoEnviado ?? 'N/A'} <br />
                  <br />
                  <h4>Conteo de Conexiones: </h4> {requestData?.solicitudes.conteoConexiones} <br />
                  <br />
                  <h4>Conteo Aceptadas:</h4>{requestData?.solicitudes.conteoAceptadas} <br />
                  <br />
                  <h4>Conteo Pendientes: </h4> {requestData?.solicitudes.conteoPendientes} <br />
                  <br />
                  <h4>Conteo Canceladas: </h4> {requestData?.solicitudes.conteoCanceladas} <br />
                  <br />
                  <h4>Conteo Enviadas:</h4> {requestData?.solicitudes.conteoEnviadas} <br />
                </WidgetBody>
              </WidgetContainer>
              <Security>
                <WidgetContainer>
                  <SecurityButton onClick={openModal}>Seguridad </SecurityButton>
                  <Modal isOpen={isModalOpen} onClose={closeModal} />
                </WidgetContainer>
              </Security>
            </PageBody>
          </PageContent>
        </InfoPageContainer>
      </PageContentContainer>
    </PageContainer>
  );
};

export default Metrics;
