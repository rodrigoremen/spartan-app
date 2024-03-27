import React from 'react'
import SignUpForm from "@/components/auth/SignUpForm";
import { Container, Card, Heading, Flex } from '@radix-ui/themes';

function RegisterPage() {
    return (
        <>
            <Container size="1" height="100%" className='p-3 md:p-0 '>
                <Flex className='h-screen w-full justify-center items-center'>
                    <Card className='w-full p-7 ' >
                        <Heading>
                            Registrar personal
                        </Heading>
                        <SignUpForm />
                    </Card>
                </Flex>
            </Container>
        </>

    )
}

export default RegisterPage