import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import ModalAgregarConceptoOpe from './ModalAgregarConceptoOpe';

interface TablaConceptosProps {
  conceptos: any[];
  id: string;
  cargarDatosConceptos: () => void;
}

function TablaConceptos({ conceptos: initialConcepto, id, cargarDatosConceptos }: TablaConceptosProps) {
  const { data: session } = useSession();
  const [conceptos, setConceptos] = useState(initialConcepto || []);
  const formatter = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' });
  useEffect(() => {
    setConceptos(initialConcepto);
  }, [initialConcepto]);
  const eliminarConcepto = async (conceptoId: string) => {
    try {
      const resp = await axios.delete(`/api/projects/${id}/conceptos`, { data: { id: conceptoId } });
      if (resp.status === 200) {
        toast.success("Concepto eliminado correctamente");
        cargarDatosConceptos();
      }
    } catch (error) {
      toast.error("Error al eliminar el concepto");
      console.error("Error al eliminar el concepto", error);
    }
  }
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>Partida</TableColumn>
        <TableColumn>Concepto</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Técnico</TableColumn>
        <TableColumn>Avance</TableColumn>
        <TableColumn>Fecha estimada</TableColumn>
        <TableColumn>Acción</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay conceptos agregados"}>
        {conceptos.map((concepto, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{concepto.concepto}</TableCell>
            <TableCell>{concepto.status}</TableCell>
            <TableCell>{concepto.tecnico}</TableCell>
            <TableCell>
              <Chip className="capitalize" color="warning" size="sm" variant="flat">
                {concepto.avance}%
              </Chip>
            </TableCell>
            <TableCell>
              {concepto.fechaEstimada
                ? formatter.format(new Date(concepto.fechaEstimada))
                : '--'}
            </TableCell>
            <TableCell className='flex gap-3'>
              {session?.user?.role === 'tecnico' ? (
                <ModalAgregarConceptoOpe id={concepto.id} cargarDatosConceptos={cargarDatosConceptos} />
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
                onClick={() => eliminarConcepto(concepto.id)}
              >
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TablaConceptos