'use client'
import { Flex, Text } from '@radix-ui/themes'
import { Input, Button } from "@nextui-org/react";
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import logo from "../../../public/images/HorizontalOriginal.png";
import Image from "next/image";
import React from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


function SignUpForm() {

    const { control, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                email: '',
                password: '',
                name: '',
                lastname: ''
            }
        }
    );
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        const resp = await axios.post('/api/auth/register', data)
        
        if (resp.status === 201) {
            const result = await signIn('credentials', {
                redirect: false,
                email: resp.data.email,
                password: data.password
            });

            if (!result?.ok) {
                console.log(result?.error);
                return;
            }

            router.push('/dashboard');
        }
        
        console.log(data);
        
        console.log(resp)
    });

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
                <Image
                    src={logo}
                    height={700}
                    alt="image login"
                    width={700}
                    className="object-cover justify-center items-center mx-auto"
                />
                <Controller
                    name='name'
                    control={control}
                    rules={
                        {
                            required: {
                                message: 'El nombre es requerido',
                                value: true,
                            },
                        }
                    }
                    render={({ field }) => {
                        return (
                            <Input
                                isRequired
                                {...field}
                                type="text"
                                label="Nombres"
                                placeholder="Mario"
                                autoFocus
                                startContent={
                                    <PersonIcon height="16" width="16" />
                                }
                            />
                        )
                    }}
                />
                {
                    errors.name && (
                        <Text color='ruby' className='text-xs'>
                            {errors.name.message}
                        </Text>
                    )
                }
                <Controller
                    name='lastname'
                    control={control}
                    rules={
                        {
                            required: {
                                message: 'El apellido es requerido',
                                value: true,
                            },
                        }
                    }
                    render={({ field }) => {
                        return (
                            <Input
                                isRequired
                                {...field}
                                type="text"
                                label="Apellidos"
                                placeholder="Zandoval"
                                startContent={
                                    <PersonIcon height="16" width="16" />
                                }
                            />
                        )
                    }}
                />
                {
                    errors.lastname && (
                        <Text color='ruby' className='text-xs'>
                            {errors.lastname.message}
                        </Text>
                    )
                }
                <Controller
                    name='email'
                    control={control}
                    rules={
                        {
                            required: {
                                message: 'El correo electrónico es requerido',
                                value: true,
                            },
                        }
                    }
                    render={({ field }) => {
                        return (
                            <Input
                                isRequired
                                {...field}
                                type="email"
                                label="Correo Electrónico"
                                placeholder="you@example.com"
                                startContent={
                                    <EnvelopeClosedIcon height="16" width="16" />
                                }
                            />
                        )
                    }}
                />
                {
                    errors.email && (
                        <Text color='ruby' className='text-xs'>
                            {errors.email.message}
                        </Text>
                    )
                }
                <Controller
                    name='password'
                    control={control}
                    rules={
                        {
                            required: {
                                value: true,
                                message: 'La contraseña es requerida'
                            },
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        }
                    }
                    render={({ field }) => {
                        return (
                            <Input
                                isRequired
                                {...field}
                                label="Contraseña"
                                placeholder="********"
                                startContent={
                                    <LockClosedIcon height="16" width="16" />
                                }
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <EyeOpenIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                        )
                    }}
                />
                {
                    errors.password && (
                        <Text color='ruby' className='text-xs'>
                            {errors.password.message}
                        </Text>
                    )
                
                }
                <Button type="submit" color='warning' className='text-white'>
                    Regístrate
                </Button>
            </Flex>
        </form>
    )
}

export default SignUpForm