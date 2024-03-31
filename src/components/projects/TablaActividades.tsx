import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";


function TablaActividades({ actividades }: { actividades: any[] }) {
    return (
        <Table aria-label="Example empty table">
            <TableHeader>
                <TableColumn>Actividad</TableColumn>
                <TableColumn>Tiempo de entrega</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay Actividades agregados"}>
                {actividades.map((actividad, index) => (
                    <TableRow key={index}>
                        <TableCell>{actividad.actividad}</TableCell>
                        <TableCell>{actividad.tiempoEntrega}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TablaActividades