import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Tooltip,
    Chip
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
    onEstadoCalculado: (estado: number) => void;  // New prop for callback
}

interface Concepto {
    id: string;
    avance: number;
}

function TablaAcuerdos({ acuerdos: initialAcuerdos, id, cargarDatos, onEstadoCalculado }: TablaAcuerdosProps) {
    const { data: session } = useSession();
    const [acuerdos, setAcuerdos] = useState(initialAcuerdos || []);
    const [conceptos, setConceptos] = useState<Concepto[]>([]);

    useEffect(() => {
        setAcuerdos(initialAcuerdos);
        fetchConceptos();
    }, [initialAcuerdos]);

    useEffect(() => {
        const estado = calcularEstado();
        onEstadoCalculado(estado);
    }, [conceptos, onEstadoCalculado]);

    const fetchConceptos = async () => {
        try {
            const resp = await axios.get(`/api/projects/${id}/conceptos`);
            if (resp.status === 200) {
                setConceptos(resp.data);
            }
        } catch (error) {
            console.error("Error al cargar los conceptos", error);
        }
    }

    const eliminarAcuerdo = async (acuerdoId: string) => {
        try {
            const resp = await axios.delete(`/api/projects/${id}/acuerdos/`, { data: { id: acuerdoId } });
            if (resp.status === 200) {
                toast.success("Acuerdo eliminado correctamente");
                cargarDatos();
            }
        } catch (error) {
            toast.error("Error al eliminar el acuerdo");
            console.error("Error al eliminar el acuerdo", error);
        }
    }

    const calcularEstado = () => {
        if (conceptos.length === 0) return 0;
        const totalAvance = conceptos.reduce((acc, concepto) => acc + (concepto.avance || 0), 0);
        const promedioAvance = totalAvance / conceptos.length;
        return Math.round(promedioAvance);
    }

    const calcularEstadoStatus = () => {
        const promedioAvance = calcularEstado();
        let color: "warning" | "danger" | "success" = "warning";
        if (promedioAvance === 0) {
            color = "danger";
        } else if (promedioAvance >= 91 && promedioAvance <= 100) {
            color = "success";
        }
        return { valor: promedioAvance, color };
    }

    const formatter = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' });

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
                {acuerdos.map((acuerdo, index) => {
                    const { valor, color } = calcularEstadoStatus();
                    return (
                        <TableRow key={index}>
                            <TableCell>{acuerdo.objetivo}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={color as "warning" | "default" | "primary" | "secondary" | "success" | "danger" | undefined} size="sm" variant="flat">
                                    {valor}%
                                </Chip>
                            </TableCell>
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
                                <Tooltip content="Eliminar acuerdo">
                                    <Button
                                        isIconOnly
                                        className="text-lg flex justify-center cursor-pointer active:opacity-50"
                                        color="danger"
                                        variant="flat"
                                        onClick={() => eliminarAcuerdo(acuerdo.id)}
                                    >
                                        <TrashIcon />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default TablaAcuerdos;
