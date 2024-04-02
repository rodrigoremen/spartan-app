import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";

interface TablaConceptosProps {
  conceptos: any[]; 
  eliminarConceptos: () => void;
}

function TablaConceptos({ conceptos, eliminarConceptos }: TablaConceptosProps) {
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>Concepto</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Técnico</TableColumn>
        <TableColumn>Avance</TableColumn>
        <TableColumn>Fecha estimada</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay conceptos agregados"}>
        {conceptos.map((concepto, index) => (
          <TableRow key={index}>
            <TableCell>{concepto.concepto}</TableCell>
            <TableCell>{concepto.status}</TableCell>
            <TableCell>{concepto.tecnico}</TableCell>
            <TableCell>
              <Chip className="capitalize" color="warning" size="sm" variant="flat">
                {concepto.avance}%
              </Chip>
            </TableCell>
            <TableCell>{concepto.fechaEstimada}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TablaConceptos