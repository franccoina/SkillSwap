'use client';
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCheck, FaTimes, FaClock, FaArrowUp } from "react-icons/fa";
import CardUserSmall from "../../components/cards/CardUserSmall";
import { getRequestById } from "../../app/api/requests";
import { getUserById } from "../../app/api/users";
import { OurAlertsText } from "@/src/lib/utils/ourAlertsText";
import { IRequestCardProps } from "@/src/models/userCards.model";
import { IUser } from "@/src/models/user.model";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ThumbnailSection = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const LargeThumbnail = styled.img`
  width: 66%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
`;

const SmallThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 8px;
  width: 34%;
`;

const SmallThumbnail = styled.img`
  width: 100%;
  height: 66px;
  object-fit: cover;
  border-radius: 8px;
`;

const MetricsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 0.5rem;
`;

const MetricIcon = styled.div`
  margin-right: 10px;
  color: #555;
  display: flex;
  align-items: center;
  padding: 2px;
`;

const MetricDiv = styled.div`
  color: #333;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const MetricTitle = styled.p`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const MetricText = styled.p`
  color: #333;
  font-size: 0.9rem;
`;

const CardUserDiscover: React.FC = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [userMetrics, setUserMetrics] = useState<IRequestCardProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (typeof window !== 'undefined') {
                const idString = localStorage.getItem('userId');
                const idNumber = idString ? parseInt(idString, 10) : null;

                if (!idNumber) {
                    setError('ID de usuario no encontrado');
                    setLoading(false);
                    return;
                }

                try {
                    const userData = await getUserById(idNumber);
                    const metricsData = await getRequestById(idNumber);

                    if (userData && metricsData) {
                        setUserMetrics(metricsData);
                        setUserData(userData);
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
        }

        fetchUserData();
    }, []);

    console.log(error)

    if (loading) return <OurAlertsText>Cargando...</OurAlertsText>;

    const Text = "No ha sucedido..."

    return (
        <CardContainer>
            <MetricsSection>
                <CardUserSmall
                    userData={userData!}
                />

                <ThumbnailSection>
                    <LargeThumbnail src="https://images.pexels.com/photos/28173032/pexels-photo-28173032/free-photo-of-ligero-naturaleza-cielo-puesta-de-sol.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Main Pic" />
                    <SmallThumbnailsContainer>
                        <SmallThumbnail src="https://images.pexels.com/photos/18292082/pexels-photo-18292082/free-photo-of-sonnenuntergang-mann-frau-musiker.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pic 1" />
                        <SmallThumbnail src="https://images.pexels.com/photos/28173035/pexels-photo-28173035/free-photo-of-sonnenuntergang-fashion-mode-frau.jpeg" alt="Pic 2" />
                    </SmallThumbnailsContainer>
                </ThumbnailSection>

                <MetricItem>
                    <MetricIcon>
                        <FaClock />
                    </MetricIcon>
                    <MetricDiv>
                        <MetricTitle>
                            {(userMetrics!.solicitudes?.ultimaPendiente != " ") ? `${userMetrics!.solicitudes?.ultimaPendiente!.split(" ")[0]} fue tu último admirador` : Text}
                        </MetricTitle>
                        <MetricText>
                            Recibidas · {userMetrics!.solicitudes?.conteoPendientes}
                        </MetricText>
                    </MetricDiv>
                </MetricItem>

                <MetricItem>
                    <MetricIcon>
                        <FaCheck />
                    </MetricIcon>
                    <MetricDiv>
                        <MetricTitle>
                            {(userMetrics!.solicitudes?.ultimaAceptada != " ") ? `${userMetrics!.solicitudes?.ultimaAceptada!.split(" ")[0]} fue tu última parada` : Text}
                        </MetricTitle>
                        <MetricText>
                            Aceptadas · {userMetrics!.solicitudes?.conteoAceptadas}
                        </MetricText>
                    </MetricDiv>
                </MetricItem>

                <MetricItem>
                    <MetricIcon>
                        <FaTimes />
                    </MetricIcon>
                    <MetricDiv>
                        <MetricTitle>
                            {(userMetrics!.solicitudes?.ultimaCancelada != " ") ? `${userMetrics!.solicitudes?.ultimaCancelada!.split(" ")[0]} fue tu última pausa` : Text}
                        </MetricTitle>
                        <MetricText>
                            Rechazadas · {userMetrics!.solicitudes?.conteoCanceladas}
                        </MetricText>
                    </MetricDiv>
                </MetricItem>

                <MetricItem>
                    <MetricIcon>
                        <FaArrowUp />
                    </MetricIcon>
                    <MetricDiv>
                        <MetricTitle>
                            {(userMetrics!.solicitudes?.ultimoEnviado != " ") ? `${userMetrics!.solicitudes?.ultimoEnviado!.split(" ")[0]} fue tu última apuesta` : Text}
                        </MetricTitle>
                        <MetricText>
                            Enviadas · {userMetrics!.solicitudes?.conteoEnviadas}
                        </MetricText>
                    </MetricDiv>
                </MetricItem>

                
            </MetricsSection>
        </CardContainer>
    );
};

export default CardUserDiscover;
