'use client';
import React, { useEffect } from 'react';
import ModalAgregarServicio from '@/components/projects/ModalAgregarServicio';
import TablaServicios from '@/components/projects/TablaServicios';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
  Input,
  Textarea,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  DatePicker,
} from '@nextui-org/react';
import { Card, Container, Heading } from '@radix-ui/themes';
import {
  EnvelopeClosedIcon,
  PersonIcon,
  MobileIcon,
  TrashIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import TablaAcuerdos from '@/components/projects/TablaAcuerdos';
import TablaConceptos from '@/components/projects/TablaConceptos';
import ModalAgregarActividades from '@/components/projects/ModalAgregarActividades';
import TablaActividades from '@/components/projects/TablaActividades';
import ModalAgregarProblema from '@/components/projects/ModalAgregarProblema';
import TablaProblema from '@/components/projects/TablaProblema';
import ModalAgregarAcuerdosAdmin from '@/components/projects/ModalAgregarAcuerdosAdmin';
import { CalendarDate, getLocalTimeZone, parseDate } from '@internationalized/date';
import ModalAgregarConceptoAdmin from '@/components/projects/ModalAgregarConceptoAdmin';

function NewProjectPage() {
  const { control, handleSubmit, setValue } = useForm({
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
      estado: '',
      servicios: [],
      fechaEntrega: parseDate("2024-01-01"),
      normas: '',
      acuerdos: [],
      avanceFinanciero: '',
      conceptos: [],
      situacionGeneral: '',
      actividades: [],
      problemas: [],
    },
  });
  const router = useRouter();
  const params = useParams() as { projectid: string };

  const [estadoAcuerdos, setEstadoAcuerdos] = React.useState(0);

  const [servicios, setServicios] = React.useState<any[]>([]);
  const agregarServicio = (servicio: any) => {
    setServicios((prevServicios: any[]) => [...prevServicios, servicio]);
  };

  const eliminarServicios = () => {
    setServicios([]);
  };

  const [acuerdos, setAcuerdos] = React.useState<any[]>([]);

  const [conceptos, setConceptos] = React.useState<any[]>([]);

  const [actividades, setActividades] = React.useState<any[]>([]);
  const agregarActividad = (actividad: any) => {
    setActividades((prevActividades: any[]) => [...prevActividades, actividad]);
  };

  const eliminarActividades = () => {
    setActividades([]);
  };

  const [problemas, setProblemas] = React.useState<any[]>([]);
  const agregarProblema = (problema: any) => {
    setProblemas((prevProblemas: any[]) => [...prevProblemas, problema]);
  };

  const eliminarProblemas = () => {
    setProblemas([]);
  };
  const onSubmit1 = handleSubmit(async (data) => {
    const timeZone = getLocalTimeZone();
    const fechaEntregaISO = data.fechaEntrega.toDate(timeZone).toISOString();
    const acuerdosConFechaISO = acuerdos.map((acuerdo) => {
      let fechaEntregaISO = acuerdo.fechaEntrega;
      if (fechaEntregaISO && typeof fechaEntregaISO !== 'string') {
        const fechaEntregaDate = new Date(fechaEntregaISO).getTime();
        if (!isNaN(fechaEntregaDate)) {
          fechaEntregaISO = fechaEntregaDate.toString();
        } else {
          console.error('Fecha de entrega no válida:', acuerdo.fechaEntrega);
          fechaEntregaISO = null;
        }
      }
      return {
        ...acuerdo,
        fechaEntrega: fechaEntregaISO,
      };
    });
    data.estado = estadoAcuerdos.toString();
    const newData = {
      ...data,
      fechaEntrega: fechaEntregaISO,
      servicios,
      acuerdos: acuerdosConFechaISO,
      conceptos,
      actividades,
      problemas,
    };
    try {
      if (!params.projectid) {
        const resp = await axios.post('/api/projects', newData);
        if (resp.status === 201) {
          router.push('/dashboard');
          router.refresh();
          toast.success('Proyecto creado correctamente');
        }
        console.log(resp);
      } else {
        const resp = await axios.put(
          `/api/projects/${params.projectid}`,
          newData
        );
        if (resp.status === 200) {
          router.push('/dashboard');
          router.refresh();
          toast.success('Proyecto editado correctamente');
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
  const cargarDatos = async () => {
    try {
      const response = await axios.get(`/api/projects/${params.projectid}/acuerdos`);
      setAcuerdos(response.data);
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };
  const cargarDatosConceptos = async () => {
    try {
      const response = await axios.get(`/api/projects/${params.projectid}/conceptos`);
      setConceptos(response.data);
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };
  const handleDelete = async (projectid: string) => {
    try {
      console.log(projectid);
      const resp = await axios.delete(`/api/projects/${projectid}`);
      if (resp.status === 200) {
        toast.success('Proyecto eliminado correctamente');
      }
      router.push('/dashboard');
      router.refresh();
      console.log(resp);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      toast.error('Error al eliminar el proyecto');
    }
  };
  useEffect(() => {
    cargarDatos();
    if (params.projectid) {
      axios
        .get(`/api/projects/${params.projectid}`)
        .then((resp) => {
          const project = resp.data;
          let fechaEntrega = null;
          if (project.fechaEntrega) {
            const date = new Date(project.fechaEntrega);
            fechaEntrega = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
          } setValue('revision', project.revision + 1);
          setValue('folio', project.folio);
          setValue('cliente', project.cliente);
          setValue('proyecto', project.proyecto);
          setValue('email', project.email);
          setValue('telefono', project.telefono);
          setValue('elaborado', project.elaborado);
          setValue('autorizado', project.autorizado);
          setValue('atencion', project.atencion);
          setValue('notas', project.notas);
          setValue('tiempoEntrega', project.tiempoEntrega);
          setValue('nota', project.nota);
          setValue('incluye', project.incluye);
          setValue('formaPago', project.formaPago);
          setValue('fechaEntrega', fechaEntrega || parseDate("2024-01-01"));
          setServicios(project.servicios || []);
          setValue('normas', project.normas);
          setValue('avanceFinanciero', project.avanceFinanciero);
          setValue('situacionGeneral', project.situacionGeneral);
          setConceptos(project.conceptos || []);
          setActividades(project.actividades || []);
          setProblemas(project.problemas || []);
          console.log(project);
        })
        .catch((error) => {
          console.error('Error al cargar el proyecto:', error);
        });
    }
  }, [params.projectid, setValue]);
  const { data: session } = useSession();

  return (
    <div className="w-fit mx-auto">
      <Breadcrumbs className="mt-3">
        <BreadcrumbItem href="/dashboard">Proyectos</BreadcrumbItem>
        <BreadcrumbItem>
          {params.projectid ? 'Actualizar proyecto' : 'Nuevo proyecto'}
        </BreadcrumbItem>
      </Breadcrumbs>
      <Container height="100%" className=" mt-8  mb-4">
        <Card className=" p-5">
          <form onSubmit={onSubmit1} className="flex flex-col gap-y-4">
            <div className='flex justify-between'>
            <Heading>
              {params.projectid ? 'Actualizar proyecto' : 'Nuevo proyecto'}
            </Heading>
            {estadoAcuerdos >= 91 && estadoAcuerdos <= 100 ? (
              <Button
                color="success"
                variant="flat"
                onClick={() => alert('Proyecto finalizado')}
              >
                Descargar PDF
              </Button>
            ) : (
              <Button
                color="success"
                variant="flat"
                onClick={() => alert('Proyecto finalizado')}
                isDisabled
              >
                Descargar PDF
              </Button>
            )}
            </div>
            <div className="flex gap-x-3">
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="revision"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        isReadOnly
                        isRequired
                        {...field}
                        type="number"
                        label="Revision"
                        placeholder="0.0"
                        className=""
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="revision"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        isRequired
                        {...field}
                        type="number"
                        label="Revision"
                        placeholder="0.0"
                        className=""
                      />
                    );
                  }}
                />
              )}
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="folio"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        isReadOnly
                        {...field}
                        isRequired
                        type="text"
                        label="Folio de cotización"
                        className=""
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="folio"
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
                    );
                  }}
                />
              )}
            </div>
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="cliente"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      isReadOnly
                      {...field}
                      isRequired
                      type="text"
                      label="Nombre del cliente"
                      className=""
                      startContent={
                        <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="cliente"
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
                  );
                }}
              />
            )}
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="proyecto"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      isReadOnly
                      {...field}
                      isRequired
                      type="text"
                      label="Nombre del proyecto"
                      className=""
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="proyecto"
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
                  );
                }}
              />
            )}
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="fechaEntrega"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    isReadOnly
                    className="w-full"
                    label="Fecha de entrega"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            ) : (
              <Controller
                name="fechaEntrega"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className="w-full"
                    label="Fecha de entrega"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            )}
            <div className="flex gap-x-3">
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isReadOnly
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        startContent={
                          <EnvelopeClosedIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="email"
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
                    );
                  }}
                />
              )}
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="telefono"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isReadOnly
                        type="number"
                        label="Teléfono de contacto"
                        placeholder="7774429079"
                        startContent={
                          <MobileIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="telefono"
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
                    );
                  }}
                />
              )}
            </div>
            <div className="flex gap-x-3">
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="elaborado"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isReadOnly
                        isRequired
                        type="text"
                        label="Elaborado por"
                        className=""
                        startContent={
                          <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="elaborado"
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
                    );
                  }}
                />
              )}
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="autorizado"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isReadOnly
                        isRequired
                        type="text"
                        label="Autorizado por"
                        className=""
                        startContent={
                          <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="autorizado"
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
                    );
                  }}
                />
              )}
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="atencion"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isReadOnly
                        isRequired
                        type="text"
                        label="Atención de"
                        className=""
                        startContent={
                          <PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="atencion"
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
                    );
                  }}
                />
              )}
            </div>
            <span className="flex items-center">
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
              <span className="shrink-0 px-6">Información general</span>
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
            </span>
            <div className="">
              {session?.user?.role === 'tecnico' ? null : (
                <>
                  <div className="flex gap-3">
                    <ModalAgregarServicio agregarServicio={agregarServicio} />
                    <Button
                      variant="flat"
                      color="danger"
                      onClick={eliminarServicios}
                    >
                      Eliminar servicios
                    </Button>
                  </div>
                </>
              )}
              <TablaServicios
                servicios={servicios}
                eliminarServicios={eliminarServicios}
              />
            </div>
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="notas"
                control={control}
                render={({ field }) => {
                  return (
                    <Textarea
                      {...field}
                      isReadOnly
                      isRequired
                      label="Notas"
                      placeholder="Ingresa una descripción del proyecto"
                      className="py-5"
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="notas"
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
                  );
                }}
              />
            )}
            <span className="flex items-center">
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
              <span className="shrink-0 px-6">
                Estas propuestas incluyen las condiciones que se indican a
                continuación
              </span>
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
            </span>
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="tiempoEntrega"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isReadOnly
                      isRequired
                      type="text"
                      label="Tiempo de entrega"
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="tiempoEntrega"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      type="text"
                      label="Tiempo de entrega"
                    />
                  );
                }}
              />
            )}
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="nota"
                control={control}
                render={({ field }) => {
                  return (
                    <Textarea
                      {...field}
                      isReadOnly
                      isRequired
                      type="text"
                      label="Nota"
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="nota"
                control={control}
                render={({ field }) => {
                  return (
                    <Textarea {...field} isRequired type="text" label="Nota" />
                  );
                }}
              />
            )}
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="normas"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isReadOnly
                      isRequired
                      type="text"
                      label="Normas"
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="normas"
                control={control}
                render={({ field }) => {
                  return (
                    <Input {...field} isRequired type="text" label="Normas" />
                  );
                }}
              />
            )}
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="incluye"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isReadOnly
                      isRequired
                      type="text"
                      label="No incluye"
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="incluye"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      type="text"
                      label="No incluye"
                    />
                  );
                }}
              />
            )}
            <div className="flex gap-x-3">
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="formaPago"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isReadOnly
                        isRequired
                        type="text"
                        label="Forma de pago"
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="formaPago"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isRequired
                        type="text"
                        label="Forma de pago"
                      />
                    );
                  }}
                />
              )}
              {session?.user?.role === 'tecnico' ? (
                <Controller
                  name="avanceFinanciero"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        isReadOnly
                        isRequired
                        type="number"
                        label="Avance financiero"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              %
                            </span>
                          </div>
                        }
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="avanceFinanciero"
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
                            <span className="text-default-400 text-small">
                              %
                            </span>
                          </div>
                        }
                      />
                    );
                  }}
                />
              )}
            </div>
            <span className="flex items-center">
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
              <span className="shrink-0 px-6">Acuerdos anteriores</span>
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
            </span>

            <div className="gap-3">
              {session?.user?.role === 'tecnico' ? null : (
                <>
                  <ModalAgregarAcuerdosAdmin id={params.projectid} cargarDatos={cargarDatos} />
                </>
              )}
              <TablaAcuerdos
                id={params.projectid}
                acuerdos={acuerdos}
                cargarDatos={cargarDatos}
                onEstadoCalculado={setEstadoAcuerdos} 
              />            
              </div>
            <span className="flex items-center">
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
              <span className="shrink-0 px-6">Avances del proyecto</span>
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
            </span>
            <div className="flex justify-between">
              <Button
                color="warning"
                variant="flat"
                onClick={() =>
                  router.push(
                    `/dashboard/project/avance/produccion/${params.projectid}`
                  )
                }
              >
                Avance de producción
              </Button>
              <Button
                color="warning"
                variant="flat"
                onClick={() =>
                  router.push(
                    `/dashboard/project/avance/instalacion/${params.projectid}`
                  )
                }
              >
                Avance de instalación
              </Button>
            </div>
            {session?.user?.role === 'tecnico' ? (
              <Controller
                name="situacionGeneral"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      type="text"
                      label="Situación general"
                    />
                  );
                }}
              />
            ) : (
              <Controller
                name="situacionGeneral"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      isReadOnly
                      isRequired
                      type="text"
                      label="Situación general"
                    />
                  );
                }}
              />
            )}
            <span className="flex items-center">
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
              <span className="shrink-0 px-6">Estatus de conceptos</span>
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
            </span>
            <div>
              <div className="flex gap-3">
                {session?.user?.role === 'tecnico' ? null : (
                  <>
                    <ModalAgregarConceptoAdmin id={params.projectid} cargarDatosConceptos={cargarDatosConceptos} />
                  </>
                )}              </div>
              <TablaConceptos
                id={params.projectid}
                conceptos={conceptos}
                cargarDatosConceptos={cargarDatosConceptos}
              />
            </div>
            <span className="flex items-center">
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
              <span className="shrink-0 px-6">
                Actividades relevantes del periodo
              </span>
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
            </span>
            <div>
              {session?.user?.role === 'administrativo' ? null : (
                <div className="flex gap-3">
                  <ModalAgregarActividades
                    agregarActividad={agregarActividad}
                  />
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={eliminarActividades}
                  >
                    Eliminar actividades
                  </Button>
                </div>
              )}
              <TablaActividades
                actividades={actividades}
                eliminarActividades={eliminarActividades}
              />
            </div>
            <span className="flex items-center">
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
              <span className="shrink-0 px-6">Problemas</span>
              <span className="h-px flex-1 dark:bg-white bg-black"></span>
            </span>
            <div>
              {session?.user?.role === 'administrativo' ? null : (
                <div className="flex gap-3">
                  <ModalAgregarProblema agregarProblema={agregarProblema} />
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={eliminarProblemas}
                  >
                    Eliminar problemas
                  </Button>
                </div>
              )}
              <TablaProblema
                problemas={problemas}
                eliminarProblemas={eliminarProblemas}
              />
            </div>
            <Button
              type="submit"
              variant="flat"
              color="warning"
              className="flex"
              startContent={<Pencil2Icon />}
            >
              {params.projectid ? 'Actualizar proyecto' : 'Crear proyecto'}
            </Button>
          </form>
          <div className="flex justify-end my-4">
            {params.projectid && (
              <Button
                color="danger"
                variant="flat"
                className=""
                startContent={<TrashIcon />}
                onClick={() => handleDelete(params.projectid)}
              >
                Eliminar proyecto
              </Button>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default NewProjectPage;
