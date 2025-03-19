"use client"
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from "../../../../components/modals/ModalTips";
import { getRequestById } from "../../../api/requests"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FooterMain } from '@/src/components/footer/FooterMain';

// Registramos los elementos de ChartJS para Bar Chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Container = styled.div`
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`

const PageContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};

  & h1 {
      margin: 0;
      height: min-content;
      translate: 0 1rem;
      font-size: 70px;
      opacity: 0.15;
      padding-left: 1rem;
    }

  & h2 {
      margin: 0;
      padding-bottom: 10px;
      margin-bottom: 20px;
      width: 70%;
      font-size: 30px;
      background: ${({ theme }) => theme.colors.gradientSecondary};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

  & h3 {
      margin: 0;
      padding: 10px 30px;
      width: 100% !important;
      font-size: 20px;
      border-bottom: 1px solid  ${({ theme }) => theme.colors.textBlack};
    }

  & h4 {
      margin: 0;
      margin-bottom: 10px;
      width: 100%;
      font-size: 20px;
    }

  & p{
      margin: 0;
      width: 100%;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.textSecondary};
  }
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

const PageContentContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const InfoPageContainer = styled.div`
  padding-top: 150px;
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
`;

const WidgetBody = styled.div`
  padding: 2rem;
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-direction: column;

  & hr{
    height: 2px;
    background: ${({ theme }) => theme.colors.gradientText};
    border: none;
    margin: 5px;
    opacity: 0.1;
    border-radius: 50%;
    margin-top: 50px;  
    margin-bottom: 20px;      
  }
`;

const TipsButton = styled.button`
  padding: 10px;
  font-size: 14px;
  width: 250px;
  margin-top: 50px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.gradientSecondary};
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  transition: 0.6s ease-in-out;
  align-self: end !important;

  &:hover {
    transition: 0.6s ease-in-out;
    transform: scale(1.05);
  }
`;

const DivTips = styled.div`
  margin-top: 1.5rem;
`;

interface IUserResponse {
  idUsuario: number;
  nombreUsuario: string;
  solicitudes: ISolicitudes;
}

interface ISolicitudes {
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
  const [requestData, setRequestData] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userIdString = localStorage.getItem("userId");
      const userId = userIdString ? Number(userIdString) : null;

      if (userId === null) {
        setError("ID de usuario no encontrado");
        setLoading(false);
        return;
      }

      const fetchRequestData = async () => {
        try {
          const data = await getRequestById(userId);
          setRequestData(data);
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

  // Datos para el gráfico de barras (Bar Chart)
  const barData = {
    labels: ["Aceptadas", "Pendientes", "Canceladas", "Enviadas"],
    datasets: [
      {
        label: "Conteo de Solicitudes",
        data: [
          requestData?.solicitudes.conteoAceptadas,
          requestData?.solicitudes.conteoPendientes,
          requestData?.solicitudes.conteoCanceladas,
          requestData?.solicitudes.conteoEnviadas,
        ],
        backgroundColor: [
          "rgba(237, 226, 176, 0.5)",
          "rgba(214, 192, 49, 0.5)",
          "rgba(228, 138, 81, 0.5)",
          "rgba(200, 15, 15, 0.5)",
        ],
        borderColor: [
          "rgb(237, 226, 176)",
          "rgb(214, 192, 49)",
          "rgb(228, 138, 81)",
          "rgb(200, 15, 15)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <PageContainer>
        <Banner>
          <BannerBody>
            <h1>Métricas</h1>
          </BannerBody>
        </Banner>
        <PageContentContainer>
          <InfoPageContainer>
            <PageContent>
              <PageBody>
                <WidgetBody>
                  <h2>Registro de actividad</h2>
                  <p>Observa aquí los detalles estadísticos de tus solicitudes y conexiones. Manténte al tanto de tu red y sigue construyendo experiencias.</p>
                  <br />
                  {/* Gráfico de Barras (Bar Chart) */}
                  <Bar data={barData} options={{ responsive: true }} />

                  {/* Apartado de seguridad */}
                  <hr></hr>
                  <DivTips>
                    <h2>Tips de actividad</h2>
                  </DivTips>
                  <p>Visualiza información valiosa sobre como orientar tu actividad en la plataforma. Los tips de <strong>SkillSwap</strong> son fundamentales para mayor seguridad, confianza y posibilidades a la hora de interactuar con otros usuarios.</p>
                  <TipsButton onClick={openModal}> ★ Tips de Actividad</TipsButton>
                  <Modal isOpen={isModalOpen} onClose={closeModal} />
                </WidgetBody>
              </PageBody>
            </PageContent>
          </InfoPageContainer>
        </PageContentContainer>
      </PageContainer>
      <FooterMain />
    </Container >
  );


};

export default Metrics;