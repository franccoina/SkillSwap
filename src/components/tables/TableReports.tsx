import React from "react";
import TableRow from "./TableRowReports";
import { TableDataReports } from "../../models/admin.reports.model";
import styled from "styled-components";
import TableHeader from "./TableHeadReports";

const TableContainer = styled.div`
  margin: 20px;
  margin-top: 2rem;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const TableStyle = styled.table`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  min-width: 1000px; 

  & caption{
    margin-bottom: 20px;
  }
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableReports: React.FC<TableDataReports> = ({ data, setDataToEdit, deleteData }) => {
  return (
    <TableContainer>
      <TableStyle>
        <TableHeader />
        <tbody>
          {data.length > 0 ? (
            data.map((report) => (
              <TableRow
                key={report.id}
                report={report}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <Tr>
              <Td colSpan={7}>Sin datos</Td>
            </Tr>
          )}
        </tbody>
      </TableStyle>
    </TableContainer>
  );
};

export default TableReports;
