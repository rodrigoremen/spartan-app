import ConfigForm from '@/components/auth/ConfigForm'
import { Card } from '@nextui-org/react'
import { Container } from '@radix-ui/themes'
import React from 'react'

function Config() {
    return (
        <>
            <Container  height="100%" className='p-3 md:p-0 mt-8'>
                    <Card className='w-full p-7'>
                        <ConfigForm/>
                    </Card>
            </Container>
        </>
    )
}

export default Config