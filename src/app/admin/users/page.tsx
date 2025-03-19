"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../../redux/slices/usersSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { IUserUpdateAdmin } from "../../../models/user.model";
import FormUsers from "../../../components/forms/FormAdminUser";
import Table from "../../../components/tables/TableUsers";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FooterMain } from '@/src/components/footer/FooterMain';

const Title = styled.h2`
  text-align: center;
  margin: 0;
  padding: 0;
  margin-top: 50px !important;
  font-weight: 500;
  font-size: 40px;
  width: 50%;
  border-bottom: solid 2px ${({ theme }) => theme.colors.textBlack};
  color: ${({ theme }) => theme.colors.textBlack};

  @media (max-width: 404px) {
    font-size: 31px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  margin: 54px 0;
  flex-direction: column;
  display: flex;
`

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();
  const [editedUser, setEditedUser] = useState<IUserUpdateAdmin | null>(null);

  // Llamar a la acción asíncrona para obtener usuarios
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Actualizar usuario
  const handleUpdateUser = async (updatedToUser: IUserUpdateAdmin) => {
    try {
      console.log("Datos que se están enviando:", updatedToUser); // Añade esto para depurar
      const response = await fetch(`https://skillswapriwi.azurewebsites.net/api/UsersPut/PutUserByUserAdmin?id=${updatedToUser.id}`, {
        method: "PUT",
        headers: {
          'accept': '*/*',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedToUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating user:", errorData);
        toast.error("Error al actualizar el usuario.");
        return;
      }

      dispatch(updateUser(updatedToUser));
      setEditedUser(null);
      toast.success("¡Usuario actualizado exitosamente!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario.");
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`https://skillswapriwi.azurewebsites.net/api/UsersDelete/DeleteUserById?id=${userId}`, {
        method: "DELETE",
        headers: {
          'accept': '*/*'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData);
        toast.error("Error al eliminar el usuario.");
        return;
      }

      dispatch(deleteUser(userId));
      toast.success("¡Usuario eliminado exitosamente!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar el usuario.");
    }
  };

  return (
    <Container>
      <Div>
        <Title>Formulario de <span>usuarios</span></Title>
        <FormUsers
          updateData={handleUpdateUser}
          dataToEdit={editedUser}
          setDataToEdit={setEditedUser}
        />
        <Title>Tabla de <span>usuarios</span></Title>
            <Table
              data={users}
              setDataToEdit={setEditedUser}
              deleteData={handleDeleteUser}
            />
      </Div>
      <FooterMain />
    </Container>
  );
};

export default Users;


