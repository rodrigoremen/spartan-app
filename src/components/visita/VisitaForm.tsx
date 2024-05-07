'use client'

import { BreadcrumbItem, Breadcrumbs, Button, Input } from '@nextui-org/react'
import { Flex, Heading } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import React, { useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

function VisitaForm() {

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            titulo: '',
            proceso: '',
            lugar: '',
            gasto: '',
            norma: '',
            visita: ''
        }
    });

    const router = useRouter();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (!params.visitaId) {
            const resp = await axios.post('/api/visita', data)
            if (resp.status === 201) {
                router.push('/dashboard/visita')
                router.refresh()
                toast.success('Reporte de visita creado exitosamente')
            }
            console.log(resp)
            } else {
                const resp = await axios.put(`/api/visita/${params.visitaId}`, data)
                if (resp.status === 200) {
                    router.push('/dashboard/visita')
                    router.refresh()
                    toast.success('Reporte de visita actualizado exitosamente')
                }
                console.log(resp)
            }
        } catch (error) {
            toast.error('Error al crear el reporte de visita')
        }
    })

    const handleDelete = async (visitaId: any) => {
        console.log('eliminando visita', visitaId)
        const resp = await axios.delete(`/api/visita/${visitaId}`)
        if (resp.status === 200) {
            router.push('/dashboard/visita')
            router.refresh()
            toast.success('Reporte de visita eliminado exitosamente')
        } else {
            toast.error('Error al eliminar el reporte de visita')
        }
    }

    useEffect(() => {
        if (params.visitaId) {
            axios.get(`/api/visita/${params.visitaId}`)
                .then((resp) => {
                    const visita = resp.data
                    setValue('titulo', visita.titulo)
                    setValue('proceso', visita.proceso)
                    setValue('lugar', visita.lugar)
                    setValue('gasto', visita.gasto)
                    setValue('norma', visita.norma)
                    setValue('visita', visita.visita)
                    console.log(visita)
                })
                .catch((error) => {
                    console.log('error al cargar la visita', error)
                })
        }
    }
        , [params.visitaId, setValue])

    return (

        <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3" className='mt-4'>
                <Breadcrumbs className='mt-3'>
                    <BreadcrumbItem href="/dashboard/visita">Reporte de visitas</BreadcrumbItem>
                    <BreadcrumbItem>{params.visitaId ? 'Actualizar reporte de visita' : 'Crear reporte de visita'}</BreadcrumbItem>
                </Breadcrumbs>
                <Heading>{params.visitaId ? 'Actualizar reporte de visita' : 'Crear reporte de visita'}</Heading>
                <Controller
                    name="titulo"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Input
                                label="Título"
                                isRequired
                                type="text"
                                placeholder=""
                                {...field}
                                className=''
                            />
                        )
                    }
                    }
                />
                <Controller
                    name="proceso"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Input
                                label="Proceso"
                                isRequired
                                type="text"
                                placeholder=""
                                {...field}
                                className=''
                            />
                        )
                    }
                    }
                />
                <Controller
                    name="lugar"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Input
                                label="Lugar"
                                isRequired
                                type="text"
                                placeholder=""
                                {...field}
                                className=''
                            />
                        )
                    }
                    }
                />
                <Controller
                    name="gasto"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Input
                                label="Gasto de diseño"
                                isRequired
                                type="text"
                                placeholder=""
                                {...field}
                                className=''
                            />
                        )
                    }
                    }
                />
                <Controller
                    name="norma"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Input
                                label="Norma"
                                isRequired
                                type="text"
                                placeholder=""
                                {...field}
                                className=''
                            />
                        )
                    }
                    }
                />
                <div className='mt-4'>
                    <Controller
                        name="visita"
                        control={control}
                        render={({ field }) => {
                            return (
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder='Escriba su reporte de visita'
                                    className=''
                                    modules={
                                        {
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                { 'indent': '-1' }, { 'indent': '+1' }],
                                                ['link','image'],
                                                ['clean']
                                            ],
                                        }
                                    }
                                    formats={
                                        [
                                            'header', 'font', 'size',
                                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                                            'list', 'bullet', 'indent',
                                            'image'
                                        ]
                                    }
                                />
                            )
                        }
                        }
                    />
                </div>
                <Button type='submit' variant='flat' color="warning" className='flex' startContent={<Pencil2Icon />}>
                    {params.visitaId ? 'Actualizar reporte de visita' : 'Crear reporte de visita'}
                </Button>
                <div className='flex justify-end my-4'>
                    {
                        params.visitaId && (
                            <Button color='danger' variant='flat' className='' startContent={<TrashIcon />}
                                onClick={() => handleDelete(params.visitaId)}
                            >
                                Eliminar Reporte de visita
                            </Button>
                        )
                    }
                </div>
            </Flex>
        </form>

    )
}

export default VisitaForm