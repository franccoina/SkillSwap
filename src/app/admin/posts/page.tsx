"use client";
import React, { useState, useEffect } from 'react';
import PostPreview from "../../../components/posts/PostPreview";
import { OurAlertsText } from '@/src/lib/utils/ourAlertsText';
import { IUser } from '@/src/models/user.model';
import styled from 'styled-components';
import { FooterMain } from '@/src/components/footer/FooterMain';
import Carousel from '@/src/components/carousels/CarouselDiscover';

const PagePosts = styled.section`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    text-align: start;
    margin: 0;
    padding-bottom: 15px;
    font-weight: 500;
    font-size: 40px;
    width: 80%;
    color :  ${({ theme }) => theme.colors.textWhite};
    opacity: 0.4;
  }

  & p {
    text-align: start;
    margin: 0;
    padding-bottom: 10px;
    width: 80%;
    color :  ${({ theme }) => theme.colors.textWhite};
    opacity: 0.4;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  margin-top: 55px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const PostSlider = styled.div`
  flex: 1 1 300px;
  max-width: 300px;
  background-color: #353535;
  border: 2px solid #444;
  border-radius: 8px;
  overflow: hidden;
`;

const DefaultCard = styled(PostSlider)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Container = styled.div`
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`

const Posts = () => {
  const [usersData, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseAllUsers = await fetch(
          `https://skillswapriwi.azurewebsites.net/api/UsersGet/GetUsersAll`, 
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!responseAllUsers.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }

        const allUsersData = await responseAllUsers.json();
        const usersArray = allUsersData.data.response;

        if (!Array.isArray(usersArray)) {
          throw new Error("Los datos de usuarios no son un array.");
        }

        const successfulUsers = await Promise.all(usersArray.map(async (user) => {
          try {
            if (user.urlGithub) {
              return user; 
            }
          } catch (error) {
            console.error(`Error al procesar el usuario ${user.id}:`, error);
          }
          return null;
        }));

        const filteredUsers = successfulUsers.filter(user => user !== null);
        setAllUsers(filteredUsers);

        if (filteredUsers.length === 0) {
          console.warn('No se encontraron usuarios válidos con perfil de GitHub.');
        }

      } catch (error) {
        console.error('Error en la carga de datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <OurAlertsText>Cargando...</OurAlertsText>;
  }

  return (
    <Container>
    <PagePosts>
      <h1>Perfiles en <span>github</span></h1>
      <p>Aquí encontrarás un espacio dedicado a explorar lo mejor de GitHub y las comunidades que lo rodean. Además, compartimos contenidos y posts especiales que profundizan en las comunidades, sus historias y contribuciones. Únete a un viaje para inspirarte, aprender y conectar con otros entusiastas de los entornos digitales.</p>
      <SliderContainer>
        <Carousel/>
      </SliderContainer>
      <SliderContainer>
        {usersData.length > 0 ? (
          usersData.map((user) => (
            <PostSlider key={user.id}>
              <PostPreview user={user} />
            </PostSlider>
          ))
        ) : (
          <DefaultCard>
            <OurAlertsText>No se encontraron usuarios.</OurAlertsText>
          </DefaultCard>
        )}
      </SliderContainer>
    </PagePosts>
    <FooterMain />
    </Container>
  );
};

export default Posts;
