import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@nextui-org/react';
import ModalAgregarRespObs from './ModalAgregarRespObs';
import { useSession } from 'next-auth/react';
import { Pencil2Icon } from '@radix-ui/react-icons';
import axios from 'axios';

interface TablaAcuerdosProps {
	acuerdos: any[];
    eliminarAcuerdos: () => void;
	id: string;
}

function TablaAcuerdos({ acuerdos: initialAcuerdos, eliminarAcuerdos, id }: TablaAcuerdosProps) {
    const { data: session } = useSession();
    const [acuerdos, setAcuerdos] = useState(initialAcuerdos || []);

    const formatter = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' });

    const cargarDatos = async () => {
        try {
            const response = await axios.get(`/api/projects/${id}/acuerdos`); 
            setAcuerdos(response.data);
        } catch (error) {
            console.error("Error al cargar los datos", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Table aria-label="Example empty table">
            <TableHeader>
                <TableColumn>Objetivo</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>Fecha de entrega</TableColumn>
                <TableColumn>Responsable</TableColumn>
                <TableColumn>Observaciones</TableColumn>
                <TableColumn>Acción</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'No hay acuerdos agregados'}>
                {acuerdos.map((acuerdo, index) => (
                    <TableRow key={index}>
                        <TableCell>{acuerdo.objetivo}</TableCell>
                        <TableCell>{acuerdo.estado}</TableCell>
                        <TableCell>
                            {acuerdo.fechaEntrega
                                ? formatter.format(new Date(acuerdo.fechaEntrega))
                                : '--'}
                        </TableCell>
                        <TableCell>{acuerdo.responsable}</TableCell>
                        <TableCell>{acuerdo.observaciones}</TableCell>
                        <TableCell>
                            {session?.user?.role === 'tecnico' ? (
                                <ModalAgregarRespObs id={acuerdo.id} cargarDatos={cargarDatos} />
                            ) : (
                                <Button
                                    isDisabled
                                    isIconOnly
                                    className="text-lg flex justify-center cursor-pointer active:opacity-50"
                                    color="warning"
                                    variant="flat"
                                >
                                    <Pencil2Icon />
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TablaAcuerdos;
