"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, createReport, updateReport, deleteReport } from "../../redux/slices/reportsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { IReport } from "../../../models/admin.reports.model";
import CreateForm from "../../../components/forms/FormAdminReports";
import Table from "../../../components/tables/TableReports";
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

const Reports: React.FC = () => {
  const reports = useSelector((state: RootState) => state.reports.reports);
  const dispatch = useDispatch<AppDispatch>();
  const [editedReport, setEditedReport] = useState<IReport | null>(null);

  console.log(reports);

  // Llamar a la acción asíncrona para obtener reportes
  useEffect(() => {
    dispatch(fetchReports());
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

  // Crear reporte
  const handleCreateReport = async (newReport: Omit<IReport, "id">) => {
    try {
      const token = getToken();
      const reportToPost: Omit<IReport, "id"> = {
        titleReport: newReport.titleReport,
        description: newReport.description,
        dateReport: newReport.dateReport,
        actionTaken: newReport.actionTaken,
        idState: newReport.idState,
        idUser: newReport.idUser,
        idReportedUser: newReport.idReportedUser,
      };

      const response = await fetch(
        "https://skillswapriwi.azurewebsites.net/api/ReportsPost/PostReportCreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reportToPost),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creando reporte:", errorData);
        toast.error(`Error al crear el reporte: ${errorData.message}`);
        return;
      }

      const createdReport: IReport = await response.json();
      dispatch(createReport(createdReport));
      toast.success("¡Reporte creado exitosamente!");
    } catch (error) {
      console.error("Error creando reporte:", error);
      toast.error("Error al crear el reporte");
    }
  };

  // Actualizar reporte
  const handleUpdateReport = async (reportToUpdate: IReport) => {
    try {
      const response = await fetch(
        `https://skillswapriwi.azurewebsites.net/api/ReportPut/PutReportByAction`,
        {
          method: "PUT",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportToUpdate),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error actualizando reporte:", errorData);
        toast.error("Error al actualizar el reporte.");
        return;
      }

      dispatch(updateReport(reportToUpdate)); // Aquí usas la acción de Redux
      setEditedReport(null);
      toast.success("¡Reporte actualizado exitosamente!");
    } catch (error) {
      console.error("Error actualizando reporte:", error);
      toast.error("Error al actualizar el reporte.");
    }
  };

  // Eliminar reporte
  const handleDeleteReport = async (reportId: number) => {
    console.log(reportId);
    try {
      const response = await fetch(
        `https://skillswapriwi.azurewebsites.net/api/ReportDelete/DeleteReportById/${reportId}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            //"Authorization": `Bearer ${token}`, // Usar token
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error eliminando reporte:", errorData);
        toast.error("Error al eliminar el reporte.");
        return;
      }

      dispatch(deleteReport(reportId));
      toast.success("¡Reporte eliminado exitosamente!");
    } catch (error) {
      console.error("Error eliminando reporte:", error);
      toast.error("Error al eliminar el reporte.");
    }
  };

  return (
    <Container>
      <Div>
        <Title>Formulario de <span>reportes</span></Title>
        <CreateForm
          createData={handleCreateReport}
          updateData={handleUpdateReport}
          dataToEdit={editedReport}
          setDataToEdit={setEditedReport}
        />
        <Title>Tabla de <span>reportes</span></Title>
        <Table
          data={reports}
          setDataToEdit={setEditedReport}
          deleteData={handleDeleteReport}
        />
      </Div>
      <FooterMain />
    </Container>
  );
};

export default Reports;
