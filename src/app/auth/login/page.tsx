import React from 'react'
import SignInForm from "@/components/auth/SignInForm";
import { Container, Card, Heading, Flex, Text, Link } from '@radix-ui/themes';
import NavLink from 'next/link';

function LoginPage() {
    return (
        <>
            <Container size="1" height="100%" className='p-3 md:p-0 '>
                <Flex className='h-screen w-full justify-center items-center'>
                    <Card className='w-full p-7 ' >
                        <Heading>
                            Iniciar Sesión
                        </Heading>
                        <SignInForm />
                    </Card>
                </Flex>
            </Container>
        </>

    )
}

export default LoginPage