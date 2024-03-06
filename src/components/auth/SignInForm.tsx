'use client'
import { Flex, Text } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon, EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { Input, Button } from "@nextui-org/react";
import logo from "../../../public/images/HorizontalOriginal.png";
import Image from "next/image";
import React from 'react'
import { useForm, Controller } from "react-hook-form";

function SignInForm() {

    const { control, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                email: '',
                password: '',
            }
        }
    );

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3" className='mt-4'>
                <Image
                    src={logo}
                    height={700}
                    alt="image login"
                    width={700}
                    className="object-cover justify-center items-center mx-auto"
                />
                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: {
                            message: 'El correo electrónico es requerido',
                            value: true,
                        },
                    }}
                    render={({ field }) => {
                        return (
                            <Input
                                isRequired
                                type="email"
                                label="Correo Electrónico"
                                placeholder="you@example.com"
                                {...field}
                                autoFocus
                                startContent={
                                    <EnvelopeClosedIcon height="16" width="16" />
                                }
                            />
                        )
                    }}
                />
                {errors.email && (
                    <Text color='ruby' className='text-xs'>
                        {errors.email.message}
                    </Text>
                )}
                <Controller
                    name='password'
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'La contraseña es requerida'
                        },
                        minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                        }
                    }}
                    render={({ field }) => {
                        return (
                            <Input
                                isRequired
                                label="Contraseña"
                                placeholder="********"
                                {...field}
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
                {errors.password && (
                    <Text color='ruby' className='text-xs'>
                        {errors.password.message}
                    </Text>
                )}
                <Button color='warning' className='text-white' type='submit'>
                    Iniciar Sesión
                </Button>
            </Flex>

        </form>
    )
}

export default SignInForm