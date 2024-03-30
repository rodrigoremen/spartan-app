import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

function TablaAcuerdos({ acuerdos }: { acuerdos: any[] }) {
    return (
        <Table aria-label="Example empty table">
            <TableHeader>
                <TableColumn>Objetivo</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>Fecha de entrega</TableColumn>
                <TableColumn>Responsable</TableColumn>
                <TableColumn>Observaciones</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay acuerdos agregados"}>
                {acuerdos.map((acuerdo, index) => (
                    <TableRow key={index}>
                        <TableCell>{acuerdo.objetivo}</TableCell>
                        <TableCell>{acuerdo.estado}</TableCell>
                        <TableCell>{acuerdo.fechaEntrega}</TableCell>
                        <TableCell>{acuerdo.responsable}</TableCell>
                        <TableCell>{acuerdo.observaciones}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TablaAcuerdos