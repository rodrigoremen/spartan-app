'use client'
import React, { useEffect } from 'react'
import ModalAgregarServicio from '@/components/ModalAgregarServicio';
import TablaServicios from '@/components/TablaServicios';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useSession } from 'next-auth/react';
import { Input, Textarea, Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Card, Container, Heading } from '@radix-ui/themes';
import { EnvelopeClosedIcon, PersonIcon, MobileIcon, TrashIcon, Pencil2Icon, CalendarIcon } from "@radix-ui/react-icons";
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useParams } from "next/navigation";
import { toast } from 'sonner';
import 'react-datepicker/dist/react-datepicker.css';
import ModalAgregarAcuerdos from '@/components/projects/ModalAgregarAcuerdos';
import TablaAcuerdos from '@/components/projects/TablaAcuerdos';
import ModalAgregarConcepto from '@/components/projects/ModalAgregarConcepto';
import TablaConceptos from '@/components/projects/TablaConceptos';



function NewProjectPage() {

  const { control, handleSubmit, setValue } = useForm(
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
        fechaEntrega:
          new Date(),
        normas: '',
        acuerdos: [],
        avanceFinanciero: '',
        conceptos: [],
        //añadir esto a la base de datos
        avanceProduccion: '',
        avanceInstalacion: '',
        situacionGeneral: '',
      }
    }
  )
  const router = useRouter();
  const params = useParams() as { projectid: string }

  const [servicios, setServicios] = React.useState<any[]>([])
  const agregarServicio = (servicio: any) => {
    setServicios((prevServicios: any[]) => [...prevServicios, servicio]);
  };

  const [acuerdos, setAcuerdos] = React.useState<any[]>([])
  const agregarAcuerdo = (acuerdo: any) => {
    setAcuerdos((prevAcuerdos: any[]) => [...prevAcuerdos, acuerdo]);
  };

  const [conceptos, setConceptos] = React.useState<any[]>([])
  const agregarConcepto = (concepto: any) => {
    setConceptos((prevConceptos: any[]) => [...prevConceptos, concepto]);
  };

  const onSubmit = handleSubmit(async (data) => {
    const newData = { ...data, servicios ,acuerdos, conceptos};
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
        const resp = await axios.put(`/api/projects/${params.projectid}`, newData)
        if (resp.status === 200) {
          router.push('/dashboard')
          router.refresh();
          toast.success('Proyecto editado correctamente')
        }
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

  useEffect(() => {
    if (params.projectid) {
      axios.get(`/api/projects/${params.projectid}`)
        .then((resp) => {
          const project = resp.data
          setValue('revision', project.revision)
          setValue('folio', project.folio)
          setValue('cliente', project.cliente)
          setValue('proyecto', project.proyecto)
          setValue('email', project.email)
          setValue('telefono', project.telefono)
          setValue('elaborado', project.elaborado)
          setValue('autorizado', project.autorizado)
          setValue('atencion', project.atencion)
          setValue('notas', project.notas)
          setValue('tiempoEntrega', project.tiempoEntrega)
          setValue('nota', project.nota)
          setValue('incluye', project.incluye)
          setValue('formaPago', project.formaPago)
          setValue('fechaEntrega', project.fechaEntrega)
          setServicios(project.servicios || []);
          setValue('normas', project.normas);
          setValue('avanceFinanciero', project.avanceFinanciero);
          setAcuerdos(project.acuerdos || []);
          setConceptos(project.conceptos || []);
          console.log(project)
        })
        .catch((error) => {
          console.error("Error al cargar el proyecto:", error);
        });
    }
  }, [params.projectid, setValue])
  const { data: session } = useSession();


  return (
    <div className='w-fit mx-auto'>
      <Breadcrumbs className='mt-3'>
        <BreadcrumbItem href="/dashboard">Proyectos</BreadcrumbItem>
        <BreadcrumbItem >{params.projectid ? 'Actualizar proyecto' : 'Nuevo proyecto'}</BreadcrumbItem>
      </Breadcrumbs>
      <Container height="100%" className=' mt-8  mb-4'>
        <Card className=' p-5'>
          <form onSubmit={onSubmit} className='flex flex-col gap-y-4'>
            <Heading>
              {params.projectid ? 'Actualizar proyecto' : 'Nuevo proyecto'}
            </Heading>
            <div className='flex gap-x-3'>
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='revision'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          isDisabled
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
                ) : <Controller
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
              }
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='folio'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          isDisabled
                          {...field}
                          isRequired
                          type="text"
                          label="Folio de cotización"
                          className=""
                        />
                      )
                    }}
                  />
                ) :
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
              }
            </div>
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='cliente'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        isDisabled
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
              ) :
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
            }
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='proyecto'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        isDisabled
                        {...field}
                        isRequired
                        type="text"
                        label="Nombre del proyecto"
                        className=""
                      />
                    )
                  }}
                />
              ) :
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
            }
            <label className='text-sm'>Fecha de inicio</label>
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='fechaEntrega'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      disabled
                      dateFormat={'dd/MM/yyyy'}
                      icon={<CalendarIcon />}
                      showIcon
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="form-input block w-full px-3 py-2 dark:bg-neutral-800 bg-neutral-100 opacity-90 rounded-md text-sm shadow-sm "
                    />
                  )}
                />
              ) :
                <Controller
                  name='fechaEntrega'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      icon={<CalendarIcon />}
                      showIcon
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="form-input block w-full px-3 py-2 dark:bg-zinc-800 bg-zinc-100  rounded-md text-sm shadow-sm "
                    />
                  )}
                />
            }
            <div className='flex gap-x-3'>
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isDisabled
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
                ) :
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
              }
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='telefono'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isDisabled
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
                ) :
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
              }

            </div>
            <div className='flex gap-x-3'>
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='elaborado'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isDisabled
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
                ) :
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
              }
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='autorizado'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isDisabled
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
                ) :
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
              }
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='atencion'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isDisabled
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
                ) :
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
              }

            </div>
            <hr />
            <label className='text-sm text-center'>Información general</label>
            <div className=''>
              {
                session?.user?.role === 'tecnico' ? (
                  <Button isDisabled variant='flat' color="warning" className='mb-3'>
                    Agregar servicio
                  </Button>
                ) :
                  <ModalAgregarServicio agregarServicio={agregarServicio} />
              }
              <TablaServicios servicios={servicios} />
            </div>
            <hr />
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='notas'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea
                        {...field}
                        isDisabled
                        isRequired
                        label="Notas"
                        placeholder="Ingresa una descripción del proyecto"
                        className="py-5"
                      />
                    )
                  }}
                />
              ) :
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
            }
            <hr />
            <label className='text-sm text-center'> Estas propuestas incluyen las condiciones que se indican a continuación</label>
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='tiempoEntrega'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isDisabled
                        isRequired
                        type="text"
                        label="Tiempo de entrega"
                      />
                    )
                  }}
                />
              ) :
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
            }
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='nota'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea
                        {...field}
                        isDisabled
                        isRequired
                        type="text"
                        label="Nota"
                      />
                    )
                  }}
                />
              ) :
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
            }
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='normas'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isDisabled
                        isRequired
                        type="text"
                        label="Normas"
                      />
                    )
                  }}
                />
              ) :
                <Controller
                  name='normas'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isRequired
                        type="text"
                        label="Normas"
                      />
                    )
                  }}
                />
            }
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='incluye'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isDisabled
                        isRequired
                        type="text"
                        label="No incluye"
                      />
                    )
                  }}
                />
              ) :
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
            }
            <div className='flex gap-x-3'>
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='formaPago'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isDisabled
                        isRequired
                        type="text"
                        label="Forma de pago"
                      />
                    )
                  }}
                />
              ) :
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
            }
            {
              session?.user?.role === 'tecnico' ? (
                <Controller
                  name='avanceFinanciero'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isDisabled
                        isRequired
                        type="number"
                        label="Avance financiero"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">%</span>
                          </div>
                        }
                      />
                    )
                  }}
                />
              ) :
                <Controller
                  name='avanceFinanciero'
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isRequired
                        type="number"
                        label="Avance financiero"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">%</span>
                          </div>
                        }
                      />
                    )
                  }}
                />
            }
            </div>
            <hr />
            <div>
              {
                session?.user?.role === 'tecnico' ? (
                  <Button isDisabled variant='flat' color="warning" className='mb-3'>
                    Agregar acuerdos anteriores
                  </Button>
                ) :
                  <ModalAgregarAcuerdos agregarAcuerdo={agregarAcuerdo} />
              }
              <TablaAcuerdos acuerdos={acuerdos} />
            </div>
            {
              session?.user?.role === 'tecnico' ? (
                <>
                  <hr />
                  <label className='text-sm text-center'>Avances del proyecto</label>
                </>
              ) : null
            }
            <div className='flex gap-x-3'>
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='avanceProduccion'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isRequired
                          type="number"
                          label="Avance de producción"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">%</span>
                            </div>
                          }
                        />
                      )
                    }}
                  />
                ) : null

              }
              {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='avanceInstalacion'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isRequired
                          type="number"
                          label="Avance de instalación"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">%</span>
                            </div>
                          }
                        />
                      )
                    }}
                  />
                ) : null
              }
            </div>
            {
                session?.user?.role === 'tecnico' ? (
                  <Controller
                    name='situacionGeneral'
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          isRequired
                          type="text"
                          label="Situación general"
                        />
                      )
                    }}
                  />
                ) : null
              }
            {
              session?.user?.role === 'tecnico' ? (
                <>
                  <hr />
                  <label className='text-sm text-center'>Estatus de conceptos</label>
                </>
              ) : null
            }
            <div>
            {
                session?.user?.role === 'tecnico' ? (
                  <>
                  <ModalAgregarConcepto agregarConcepto={agregarConcepto} />
                  <TablaConceptos conceptos={conceptos} />
                  </>
                ) : null    
              }
            </div>
            <Button type='submit' variant='flat' color="warning" className='flex' startContent={<Pencil2Icon />}>
              {params.projectid ? 'Actualizar proyecto' : 'Crear proyecto'}
            </Button>
          </form>
          <div className='flex justify-end my-4'>
            {
              params.projectid && (
                <Button color='danger' variant='flat' className='' startContent={<TrashIcon />}
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


