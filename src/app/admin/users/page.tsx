"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../../redux/slices/usersSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { IUser, IUserUpdateAdmin } from "../../../models/user.model"; 
import FormUsers from "../../../components/forms/FormAdminUser"; 
import Table from "../../../components/tables/TableUsers";
import styled from "styled-components";
import { toast } from "react-toastify";

const Title = styled.h2`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 5px;
  color: black;
  font-weight: bold;
  font-size: 15pt;
`;

const Div = styled.div`
  margin: 54px 0;
`;

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();
  const [editedUser, setEditedUser] = useState<IUserUpdateAdmin | null>(null);

  // Llamar a la acción asíncrona para obtener usuarios
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Función para obtener el token
  const getToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Token no disponible. Inicia sesión.");
      throw new Error("Token no disponible");
    }
    return token;
  };

  // Actualizar usuario
  const handleUpdateUser = async (updatedToUser: IUserUpdateAdmin) => {
    try {
      console.log("Datos que se están enviando:", updatedToUser); // Añade esto para depurar
      const token = getToken();
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
      toast.success("Usuario actualizado exitosamente!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario.");
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId: number) => {
    try {
      const token = getToken(); // Obtener token
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
      toast.success("Usuario eliminado exitosamente!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar el usuario.");
    }
  };

  return (
    <Div>
      <Title>Formulario de Usuarios</Title>

      <FormUsers
        updateData={handleUpdateUser}
        dataToEdit={editedUser}
        setDataToEdit={setEditedUser}
      />
      <Table 
        data={users}
        setDataToEdit={setEditedUser}
        deleteData={handleDeleteUser} 
      />
    </Div>
  );
};

export default Users;

