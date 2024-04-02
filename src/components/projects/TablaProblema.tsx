import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface TablaProblemasProps {
    problemas: any[]; 
    eliminarProblemas: () => void;
  }

function TablaProblema({ problemas, eliminarProblemas }: TablaProblemasProps) {
    return (
        <Table aria-label="Example empty table">
            <TableHeader>
                <TableColumn>Problemas</TableColumn>
                <TableColumn>Respuesta</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay problemas agregados"}>
                {problemas.map((problema, index) => (
                    <TableRow key={index}>
                        <TableCell>{problema.problemas}</TableCell>
                        <TableCell>{problema.respuesta}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TablaProblema