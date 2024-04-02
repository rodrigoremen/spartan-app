'use client';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs, Input, Card, Image, Button, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { Container, Heading } from "@radix-ui/themes";
import { toast } from 'sonner';
import { TrashIcon } from "@radix-ui/react-icons";

interface Project {
  id: string;
  nombre: string;
  conceptos: Concepto[];
}

function ReporteFotografico() {
  const params = useParams() as { projectid: string }
  const [project, setProject] = useState<Project | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [conceptId, setConceptId] = useState<string | null>(null);


  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('conceptId', conceptId as string);
    const resp = await axios.post(`/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (resp.status === 200) {
      toast.success(resp.data.message);
      setImageURL(resp.data.url);
      window.location.reload();
    }
  }

  const eliminarFoto = async (photoId: any) => {
    try {
      const response = await axios.delete(`/api/upload/${photoId}`);
      if (response.status === 200) {
        toast.success('Foto eliminada correctamente');
        window.location.reload();
      } else {
        toast.error('Error al eliminar la foto');
      }
    } catch (error) {
      console.error('Error al eliminar la foto:', error);
      toast.error('Error al eliminar la foto');
    }
  };

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await axios.get(`/api/projects/${params.projectid}`);
        setProject(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error loading project", error);
      }
    }

    loadProject();
  }, [params.projectid]);


  return (
    <div className='w-fit mx-auto'>
      <Breadcrumbs className='mt-6'>
        <BreadcrumbItem href="/dashboard/reports">Proyectos</BreadcrumbItem>
        <BreadcrumbItem >Reporte fotográfico</BreadcrumbItem>
      </Breadcrumbs>
      <Container height="100%" className='mt-8 mb-4 p-6'>
        <Card className='p-8'>
          <form onSubmit={onSubmit}>
            <Heading>Reporte fotográfico</Heading>
            <div className="mt-4">
              {project && (
                <Select
                  className="mb-5"
                  id="conceptSelect"
                  onChange={(e) => setConceptId(e.target.value)}
                  label="Concepto"
                  selectionMode="single"
                >
                  {project.conceptos.map((concepto: any) => (
                    <SelectItem key={concepto.id} value={concepto.id}>
                      {concepto.concepto}
                    </SelectItem>
                  ))}
                </Select>
              )}
              <Input type="file" onChange={(e) => {
                if (e.target.files !== null) {
                  setFile(e.target.files[0]);
                }
              }}
              />
            </div>
            <Button type="submit" className="mt-4" variant="flat" color="warning">
              Subir
            </Button>
          </form>
          {file && (
            <div className="mt-4">
              <Image src={URL.createObjectURL(file)} alt="Foto" className="w-1/3 mx-auto" />
            </div>
          )}
        </Card>
      </Container>
      <Container height="100%" className='mt-8 mb-4 p-6'>
        <Card className='p-8'>
          <Heading>Fotos</Heading>
          {project && project.conceptos.map((concepto: any) => (
            <div key={concepto.id} >
              <p className="text-xl font-bold">{concepto.concepto}</p>
              {concepto.photos && concepto.photos.map((photo: any) => (
                <div key={photo.id} className="flex items-center p-8 space-x-2">
                  <Image src={photo.url} alt="Imagen del concepto" className="w-1/2 mt-3" />
                  <Tooltip content='Elminar foto' color="danger">
                    <Button color="danger" variant="flat" isIconOnly onClick={() => eliminarFoto(photo.id)}>
                      <TrashIcon className="" />
                    </Button>
                  </Tooltip>
                </div>
              ))}
              {concepto.photos.length === 0 && (
                <p className="font-medium text-xl text-center text-zinc-500">No hay fotos para este concepto</p>
              )}
            </div>
          ))}
        </Card>
      </Container>
    </div>
  );
}

export default ReporteFotografico;