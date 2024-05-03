'use client'

import { Button } from '@nextui-org/react'
import { Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import React from 'react'

function HeaderVisitia() {
    const router = useRouter()
    return (
        <div className='justify-between flex'>
            <div>
                <Heading> Reportes de visitas </Heading>
                <p className='text-sm'>Aquí encontraras todos los reportes de las visitas!🔧</p>
            </div>
            <Button onClick={() => router.push('/dashboard/visita/new')} color="warning" variant="flat">
                Crear reporte de visita
            </Button>
        </div>
    )
}

export default HeaderVisitia