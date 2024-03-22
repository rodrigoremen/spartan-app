'use client'
import React from 'react'
import DatePicker from '@/components/DatePicker';
import ModalAgregarServicio from '@/components/ModalAgregarServicio';
import TablaServicios from '@/components/TablaServicios';
import axios from 'axios';
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { Card, Container, Heading } from '@radix-ui/themes';
import { EnvelopeClosedIcon, PersonIcon, MobileIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { normas } from '@/components/data/Normas';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useParams } from "next/navigation";
import { toast } from 'sonner';


function NewProjectPage() {

  const { control, handleSubmit } = useForm(
    {
      defaultValues: {
        revision: '',
        folio: '',
        cliente: '',
        proyecto: '',
        email: '',
        telefono: '',
        elaborado: '',
        autorizado: '',
        atencion: '',
        notas: '',
        tiempoEntrega: '',
        nota: '',
        incluye: '',
        formaPago: '',
        servicios: [],
        fechaEntrega: new Date(),
        normas: [
        ]
      }
    }
  )
  const router = useRouter();
  const params = useParams() as { projectid: string }

  const [servicios, setServicios] = React.useState<any[]>([])
  const agregarServicio = (servicio: any) => {
    setServicios((prevServicios: any[]) => [...prevServicios, servicio]);
  };


  const onSubmit = handleSubmit(async (data) => {
    const newData = { ...data, servicios };
    try {
      if (!params.projectid) {
        const resp = await axios.post('/api/projects', newData)
        if (resp.status === 201) {
          router.push('/dashboard')
          router.refresh();
          toast.success('Proyecto creado correctamente')
        }
        console.log(resp);
      } else {
        console.log('editando proyecto')
      }
    } catch (error) {
      if ((error as any).response?.status === 400) {
        toast.error('EL folio ya existe');
      }
      if ((error as any).response?.status === 500) {
        toast.error('Error en el servidor');
      }
    }
  });

  const handleDelete = async (projectid: string) => {
    console.log(projectid)
    const resp = await axios.delete(`/api/projects/${projectid}`)

    if (resp.status === 200) {
      toast.success('Proyecto eliminado correctamente')
    }

    router.push('/dashboard')
    router.refresh()

    console.log(resp)
  }

  return (
    <div className='w-fit mx-auto'>
      <Container height="100%" className='p-3 mt-8 md:p-0 mb-4'>
        <Card className=' p-5'>
          <form onSubmit={onSubmit} className='flex flex-col gap-y-4'>
            <Heading>
              {params.projectid ? 'Editar proyecto' : 'Nuevo proyecto'}
            </Heading>
            <div className='flex gap-x-3'>
              <Controller
                name='revision'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      isRequired
                      {...field}
                      type="number"
                      label="Revision"
                      placeholder='0.0'
                      className=""
                    />
                  )
                }}
              />
              <Controller
                name='folio'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      type="text"
                      label="Folio de cotización"
                      className=""
                    />
                  )
                }}
              />
            </div>
            <Controller
              name='cliente'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isRequired
                    type="text"
                    label="Nombre del cliente"
                    className=""
                    startContent={
                      <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                )
              }}
            />
            <Controller
              name='proyecto'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isRequired
                    type="text"
                    label="Nombre del proyecto"
                    className=""
                  />
                )
              }}
            />
            <label className='text-sm'>Fecha de entrega estimada</label>
            <Controller
              name='fechaEntrega'
              control={control}
              render={
                ({ field }) => {
                  return (
                    <DatePicker
                      {...field}

                    />
                  )
                }
              } />
            <div className='flex gap-x-3'>
              <Controller
                name='email'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="email"
                      label="Email"
                      placeholder="you@example.com"
                      startContent={
                        <EnvelopeClosedIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  )
                }}
              />
              <Controller
                name='telefono'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="number"
                      label="Teléfono de contacto"
                      placeholder="7774429079"
                      startContent={
                        <MobileIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  )
                }}
              />
            </div>
            <div className='flex gap-x-3'>
              <Controller
                name='elaborado'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      type="text"
                      label="Elaborado por"
                      className=""
                      startContent={
                        <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  )
                }}
              />
              <Controller
                name='autorizado'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      type="text"
                      label="Autorizado por"
                      className=""
                      startContent={
                        <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  )
                }}
              />
              <Controller
                name='atencion'
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      type="text"
                      label="Atención de"
                      className=""
                      startContent={
                        <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  )
                }}
              />
            </div>
            <hr />
            <label className='text-sm text-center'>Información general</label>
            <div className=''>
              <ModalAgregarServicio agregarServicio={agregarServicio} />
            </div>
            <TablaServicios servicios={servicios} />
            <hr />
            <Controller
              name='notas'
              control={control}
              render={({ field }) => {
                return (
                  <Textarea
                    {...field}
                    isRequired
                    label="Notas"
                    placeholder="Ingresa una descripción del proyecto"
                    className="py-5"
                  />
                )
              }}
            />
            <hr />
            <label className='text-sm text-center'> Estas propuestas incluyen las condiciones que se indican a continuación</label>
            <Controller
              name='tiempoEntrega'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isRequired
                    type="text"
                    label="Tiempo de entrega"
                  />
                )
              }}
            />
            <Controller
              name='nota'
              control={control}
              render={({ field }) => {
                return (
                  <Textarea
                    {...field}
                    isRequired
                    type="text"
                    label="Nota"
                  />
                )
              }}
            />
            <Controller
              name='normas'
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    isRequired
                    items={normas}
                    label="Normas de cumplimiento"
                    selectionMode="multiple"
                    placeholder="Seleccione las normas de cumplimiento"
                    className=""
                  >
                    {(normas) => <SelectItem key={normas.value}>{normas.label}</SelectItem>}
                  </Select>
                )
              }}
            />
            <Controller
              name='incluye'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isRequired
                    type="text"
                    label="No incluye"
                  />
                )
              }}
            />
            <Controller
              name='formaPago'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isRequired
                    type="text"
                    label="Forma de pago"
                  />
                )
              }}
            />
            <Button type='submit' variant='flat' color="warning" className='mx-auto' startContent={<Pencil2Icon />}>
              {params.projectid ? 'Editar proyecto' : 'Crear proyecto'}
            </Button>
          </form>
          <div className='flex justify-end my-4'>
            {
              params.projectid && (
                <Button color='danger' variant='flat' className='mx-auto' startContent={<TrashIcon />}
                  onClick={() => handleDelete(params.projectid)}
                >
                  Eliminar proyecto
                </Button>
              )
            }
          </div>
        </Card>
      </Container>
    </div>

  )
}

export default NewProjectPage