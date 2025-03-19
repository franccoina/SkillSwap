"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import WidgetContainer from "../../../../components/containers/WidgetContainer/WidgetContainer";
import { getUserById, toggleUserAccountState } from "../../../api/users";
import { FooterMain } from '@/src/components/footer/FooterMain';
import ModalConfirm from "@/src/components/modals/ModalConfirm";
import { toast } from "react-toastify";

//Container for the whole page.tsx
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
    width: 100%;
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.textBlack};
  }

  & h4 {
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
    opacity: 0.3;
    font-weight: 400;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  & p {
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
`;

//Containers for banner
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

//Container for INFO content
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

const PDesc = styled.p`
    font-size: 15px !important;
    max-width: 300px !important;
    hyphens: unset;
`;

const DivDeactivateAccount = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  align-items: end;
  padding: 2rem;
  gap: 2rem;

  & div {
    max-width: 400px;

    & p {
      font-size: 15px;
      hyphens: unset;
    }
  }
`;

const ButtonDeactivate = styled.button<({ color: string }) >`
  min-width: 100px;
  width: 30vw;
  max-width: 250px;
  text-align: center;
  border-radius: 10px;
  margin: 10px 0;
  background-color: transparent;
  padding: 10px;
  font-weight: 500;
  color: ${(props) => props.color};
  border: ${(props) => props.color} 1px solid;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.color};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.bgDisabled};
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }
`;

const AccountStateButton = styled.div<({ color: string }) >`
  width: 100px;
  text-align: center;
  border-radius: 50px;
  margin: 10px 0;
  padding: 2px;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.color};
  border: ${(props) => props.color} 1px solid;
`;

const Container = styled.div`
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`;

const UserInfo = () => {
  const [accountState, setAccountState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAccountState = async () => {
      if (typeof window !== 'undefined') {
        const idString = localStorage.getItem("userId");
        const idNumber = idString ? parseInt(idString, 10) : null;

        if (!idNumber) {
          setError("ID de usuario no encontrado");
          setLoading(false);
          return;
        }

        try {
          const data = await getUserById(idNumber);
          setAccountState(data.nameStateUser ?? "Estado desconocido");
        } catch (err) {
          setError(err as string);
        } finally {
          setLoading(false);
        }
      };
    }
    fetchAccountState();
  }, []);

  const handleToggleAccountState = async () => {
    if (typeof window !== 'undefined') {
      const idString = localStorage.getItem("userId");
      const idNumber = idString ? parseInt(idString, 10) : null;

      if (!idNumber) return;

      const newAction = accountState === "Activo" ? "deshabilitar" : "habilitar";

      try {
        const data = await toggleUserAccountState(idNumber, newAction);
        setAccountState(data);
        toast.success(`Se logró ${newAction} tu cuenta con éxito.`);
      } catch (err) {
        setError(err as string);
        toast.error(`No se pudo ${newAction} tu cuenta. Intenta de nuevo.`);
      }
    }
  };

  const stateBtnColor = () => {
    if (accountState === "Activo") return "#F0AC27";
    else if (accountState === "Inactivo") return "#828282";
    else return "#666666";
  }

  const changeStateBtnColor = () => {
    if (accountState === "Activo") return "#D13B00";
    else if (accountState === "Inactivo") return "#4072C3";
    else return "#666666";
  }

  // Render del componente
  return (
    <Container>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleToggleAccountState();
          setIsModalOpen(false);
        }}
      />
      <PageContainer>
        <Banner>
          <BannerBody>
            <h1>Info</h1>
          </BannerBody>
        </Banner>
        <PageContentContainer>
          <InfoPageContainer>
            <PageContent>
              <PageBody>
                <h2>Configuración y datos</h2>

                <WidgetContainer>
                  <WidgetBody>
                    <h4>| Estado de cuenta</h4>

                    <PDesc>
                      Aquí podrás ver en que condición se encuentra tu cuenta actualmente.
                    </PDesc>

                    {loading ? (
                      <p>Cargando...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      <AccountStateButton color={stateBtnColor()}>✦ {accountState}</AccountStateButton>
                    )}
                  </WidgetBody>

                  <DivDeactivateAccount>
                    <ButtonDeactivate
                      color={changeStateBtnColor()}
                      onClick={() => setIsModalOpen(true)}
                      disabled={accountState === "Suspendido"} // Deshabilita el botón si está suspendido
                    >
                      {accountState === "Activo"
                        ? "Deshabilitar cuenta"
                        : "Habilitar cuenta"}
                    </ButtonDeactivate>

                    {accountState === "Suspendido" && (
                      <p>
                        Tu cuenta ha sido suspendida por un administrador. No
                        puedes cambiar el estado hasta que el administrador lo
                        restaure.
                      </p>
                    )}

                    <div>
                      <h4>| Deshabilitación de cuenta</h4>
                      <p>
                        <strong> Atención: </strong>Al desactivar tu cuenta de SkillSwap, toda tu
                        información permanecerá segura y no será eliminada.
                      </p>
                    </div>
                  </DivDeactivateAccount>
                </WidgetContainer>
              </PageBody>
            </PageContent>
          </InfoPageContainer>
        </PageContentContainer>
      </PageContainer>
      <FooterMain />
    </Container>
  );
};

export default UserInfo;
