'use client';

import { BreadcrumbItem, Breadcrumbs, Card, Chip, User, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react'
import { Project } from '@prisma/client';
import { Container, Heading } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { PaperPlaneIcon, PersonIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import TablaAvanceIns from '@/components/projects/avance/TablaAvanceIns';
import ModalAgregrarAvanceIns from '@/components/projects/avance/ModalAvanceIns';

function InstalacionPage() {

  const [project, setProject] = useState<Project | null>(null);
  const params = useParams() as { projectid: string }
  const { data: session } = useSession();
  const router = useRouter()
  const { handleSubmit } = useForm({
    defaultValues: {
      tarea: [],
    }
  });

  const [tarea, setTarea] = useState<any[]>([]);
  const agregarTarea = (newTarea: any) => {
    setTarea([...tarea, newTarea]);
  };
  const totalTareas = tarea.length;
  const avanceTareas = tarea.reduce((total, tarea) => total + tarea.avance, 0);
  const avance = Math.floor((avanceTareas / (totalTareas * 100)) * 100);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const resp = await axios.post(`/api/projects/${params.projectid}/avanceIns`, { ...data, tarea });
      console.log(resp);
      if (resp.status === 201) {
        toast.success("Avance guardado exitosamente");
        router.push(`/dashboard/project/${params.projectid}`);
      }
    } catch (error: any) {
      console.error("Error saving avance", error);
      const errorMessage = error.response?.data?.message || "Error al guardar avance";
      toast.error(errorMessage);
    }
  });
  const handleDelete = async (index: any) => {
    try {
      console.log('eliminando tarea', index)
      const resp = await axios.delete(`/api/projects/${params.projectid}/avanceIns`, { data: { id: index } });
      if (resp.status === 200) {
        router.refresh();
        toast.success('Tarea eliminada exitosamente');
        router.push(`/dashboard/project/${params.projectid}`);
      }
    } catch (error) {
      console.log('Error al eliminar la tarea', error)
      toast.error('Error al eliminar la tarea')
    }
  }

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await axios.get(`/api/projects/${params.projectid}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error loading project", error);
      }
    }

    async function loadAvance() {
      try {
        const response = await axios.get(`/api/projects/${params.projectid}/avanceIns`);
        setTarea(response.data);
      } catch (error) {
        console.error("Error loading avance", error);
      }
    }

    loadProject();
    loadAvance();
  }, [params.projectid]);
  return (
    <div className='p-8'>
      <Breadcrumbs className='mt-6'>
        <BreadcrumbItem onClick={() => router.back()}>Proyectos</BreadcrumbItem>
        <BreadcrumbItem >Reporte de avance de producción</BreadcrumbItem>
      </Breadcrumbs>
      <Container height="100%" className='mt-8 mb-4 p-6'>
        <Card className='p-8'>
          <form onSubmit={onSubmit}>
            <Heading>Avance de producción</Heading>
            <div className="mt-4 justify-between flex px-24">
              <h1 className='text-xl '>{project?.proyecto}</h1>
              <User
                name={session?.user?.name || "User"}
                description={session?.user?.role}
                avatarProps={{
                  fallback: <PersonIcon />
                }}
              />
            </div>
            <div className='flex justify-between mt-6 px-24'>
              <div className='grid gap-2 '>
                <Chip color="default" variant='solid'>Estatus</Chip>
                <Chip color="danger">No iniciado</Chip>
                <Chip color="warning">En proceso</Chip>
                <Chip color="success">Terminado</Chip>
              </div>
              <div className='flex'>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>Avance</TableColumn>
                    <TableColumn>%</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Avance producción</TableCell>
                      <TableCell>
                        {Number.isNaN(avance) ? <Chip color="danger">No iniciado</Chip> : ''}
                        {avance > 0 && avance < 90 ? <Chip color="warning">{avance}%</Chip> : ''}
                        {avance >= 90 ? <Chip color="success">{avance}%</Chip> : ''}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className='mt-6'>
              <TablaAvanceIns tarea={tarea} onEliminar={handleDelete} />            
              <ModalAgregrarAvanceIns agregarTarea={agregarTarea} />
            </div>
            <div className='mt-6'>
              <Button type="submit" variant='flat' color='success' className='' startContent={
                <PaperPlaneIcon className='w-5 h-5' />
              }>
                Guardar avance
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  )
}

export default InstalacionPage