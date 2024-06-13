import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react'

interface TablaAvanceProdProps {
    tarea: any[];
    onEliminar: (index: number) => void;
}

function TablaAvanceProd({ tarea, onEliminar }: TablaAvanceProdProps) {
    return (
        <Table>
            <TableHeader>
                <TableColumn>PARTIDA</TableColumn>
                <TableColumn>TAREA</TableColumn>
                <TableColumn>DESCRIPCIÓN</TableColumn>
                <TableColumn>AVANCE</TableColumn>
                <TableColumn>ACCIÓN</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay tareas agregadas"}>
                {tarea.map((tarea, index) => (
                    <TableRow key={tarea.id || index}>
                        <TableCell>{tarea.id}</TableCell>
                        <TableCell>{tarea.titulo}</TableCell>
                        <TableCell>{tarea.descripcion}</TableCell>
                        <TableCell>
                            <Chip className="capitalize" color="warning" size="sm" variant="flat">
                                {tarea.avance}%
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <Tooltip content="Eliminar tarea">
                                <Button onClick={() => onEliminar(tarea.id)} isIconOnly color='danger' variant="light" className="text-lg flex justify-center cursor-pointer active:opacity-50">
                                    <TrashIcon />
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TablaAvanceProd
