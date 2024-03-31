import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";


function TablaProblema({ problemas }: { problemas: any[] }) {
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