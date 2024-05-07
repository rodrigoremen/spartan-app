'use client'

import { Button, Card, CardBody, CardFooter, Tooltip } from '@nextui-org/react'
import { Visita } from '@prisma/client'
import React from 'react'
import { useRouter } from "next/navigation";
import { CameraIcon } from "@radix-ui/react-icons";

interface Props {
    visita: Visita
}

function VisitasCards({ visita }: Props) {
    const router = useRouter()
    return (
        <Card key={visita.id} className='p-4' shadow='md'
        isPressable onPress={() => router.push(`/dashboard/visita/${visita.id}`)}
        >
            <CardBody>
                <h1 className='text-xl font-bold'>{visita.titulo}</h1>
            </CardBody>
            <CardFooter className='flex justify-between'>
                <p className='text-md text-slate-600'>{visita.proceso}</p>
            </CardFooter>

        </Card>
    )
}

export default VisitasCards