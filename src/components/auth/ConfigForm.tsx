'use client';

import { Button, Input } from '@nextui-org/react';
import { EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Heading } from '@radix-ui/themes'
import { useSession, getSession } from 'next-auth/react';
import { toast } from 'sonner'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';


function ConfigForm() {

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            id: '',
            name: '',
            lastName: '',
            email: ''
        }
    });

    const router = useRouter();
    const { data: session } = useSession();

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            const resp = await axios.put('/api/auth/update', data);
            if (resp.status === 200) {
                const session = await getSession();
                if (session) {
                    session.user = resp.data;
                    router.refresh();
                    toast.success('Usuario actualizado exitosamente');
                }
            }
        } catch (error: any) {
            toast.error(error.response.data.message || 'Error al actualizar el usuario');
        }
    });

    useEffect(() => {
        if (session) {
            setValue('id', session.user.id);
            setValue('name', session.user.name);
            setValue('lastName', session.user.lastName);
            setValue('email', session.user.email);
        }
    }, [session])

    const handlePassword = async (data: any) => {
        try {
            console.log(data)
            const resp = await axios.put('/api/auth/update/password', data);
            if (resp.status === 200) {
                toast.success('Contraseña actualizada exitosamente');
            }
        } catch (error: any) {
            toast.error(error.response.data.message || 'Error al actualizar la contraseña');
        }
    }

    return (
        <>
            <div className='text-center '>
                <Heading>
                    Configuración de la cuenta de {session?.user?.name}
                </Heading>
                <Heading>
                    Tipo de cuenta: {session?.user?.role}
                </Heading>
            </div>
            <form onSubmit={onSubmit}>
                <div className='py-7'>
                    <h1 className='text-lg font-bold py-3'>Información personal</h1>
                    <p className='text-sm py-2'>Para poder ver tu información actualizada vuelva a iniciar sesión 😜</p>
                    <div className='flex gap-x-3'>
                        <Controller
                            name='name'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input
                                        isRequired
                                        {...field}
                                        type='text'
                                        label="Nombre"
                                        startContent={
                                            <PersonIcon height="16" width="16" />
                                        }
                                    />
                                )
                            }
                            }
                        />
                        <Controller
                            name='lastName'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input
                                        {...field}
                                        isRequired
                                        type='text'
                                        label="Apellido"

                                        startContent={
                                            <PersonIcon height="16" width="16" />
                                        }
                                    />
                                )
                            }
                            }
                        />
                    </div>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    isRequired
                                    type='email'
                                    label="Correo"

                                    className='mt-3'
                                    startContent={
                                        <EnvelopeClosedIcon height="16" width="16" />
                                    }
                                />
                            )
                        }
                        }
                    />
                    <Button
                        type='submit'
                        className='mt-3'
                        variant='flat'
                        color='warning'
                    >
                        Actualizar información
                    </Button>
                </div>
            </form>
        </>
    )
}

export default ConfigForm