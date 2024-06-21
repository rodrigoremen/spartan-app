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
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { toast } from 'sonner';

interface TablaAcuerdosProps {
    acuerdos: any[];
    id: string;
    cargarDatos: () => void;
}

function TablaAcuerdos({ acuerdos: initialAcuerdos, id, cargarDatos }: TablaAcuerdosProps) {
    const { data: session } = useSession();
    const [acuerdos, setAcuerdos] = useState(initialAcuerdos || []);
    const formatter = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' });
    useEffect(() => {
        setAcuerdos(initialAcuerdos);
    }, [initialAcuerdos]);
    const eliminarAcuerdo = async (acuerdoId: string) => {
        try {
            const resp = await axios.delete(`/api/projects/${id}/acuerdos/` , { data: { id: acuerdoId } });
            if (resp.status === 200) {
                toast.success("Acuerdo eliminado correctamente");
                cargarDatos(); 
            }
        } catch (error) {
            toast.error("Error al eliminar el acuerdo");
            console.error("Error al eliminar el acuerdo", error);
        }
    }
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
                        <TableCell className='flex gap-3'>
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
                            <Button
                                isIconOnly
                                className="text-lg flex justify-center cursor-pointer active:opacity-50"
                                color="danger"
                                variant="flat"
                                onClick={() => eliminarAcuerdo(acuerdo.id)}
                            >
                                <TrashIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TablaAcuerdos;
