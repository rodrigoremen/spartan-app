import React from 'react'
import SignUpForm from "@/components/auth/SignUpForm";
import { Container, Card, Heading, Flex, Text, Link } from '@radix-ui/themes';
import NavLink from 'next/link';

function RegisterPage() {
    return (
        <>
            <Container size="1" height="100%" className='p-3 md:p-0 '>
                <Flex className='h-screen w-full justify-center items-center'>
                    <Card className='w-full p-7 ' >
                        <Heading>
                            Regístrate
                        </Heading>
                        <SignUpForm />
                        <Flex justify="between" my="4">
                            <Text>
                                Ya tienes cuenta?
                            </Text>
                            <Link asChild>
                                <NavLink href="/auth/login" passHref>
                                    Inicia sesión!
                                </NavLink>
                            </Link>
                        </Flex>
                    </Card>
                </Flex>
            </Container>
        </>

    )
}

export default RegisterPage