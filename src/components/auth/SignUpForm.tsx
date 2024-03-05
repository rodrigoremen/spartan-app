'use client'
import { Flex,  } from '@radix-ui/themes'
import { Input, Button } from "@nextui-org/react";
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import logo from "../../../public/images/HorizontalOriginal.png";
import Image from "next/image";
import React from 'react'


function SignUpForm() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Flex direction="column" gap="3">
            <Image
                src={logo}
                height={700}
                alt="image login"
                width={700}
                className="object-cover justify-center items-center mx-auto"
            />
            <Input
                isRequired
                type="text"
                label="Nombres"
                placeholder="Mario"
                autoFocus
                startContent={
                    <PersonIcon height="16" width="16" />
                }
            />
            <Input
                isRequired
                type="text"
                label="Apellidos"
                placeholder="Zandoval"
                startContent={
                    <PersonIcon height="16" width="16" />
                }
            />
            <Input
                isRequired
                type="email"
                label="Correo Electrónico"
                placeholder="you@example.com"
                startContent={
                    <EnvelopeClosedIcon height="16" width="16" />
                }
            />
           <Input
                isRequired
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
            <Button color='warning' className='text-white'>
                Regístrate
            </Button>
        </Flex>
    )
}

export default SignUpForm