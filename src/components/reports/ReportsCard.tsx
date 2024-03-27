'use client'
import { Card, CardBody, CardFooter, Tooltip } from '@nextui-org/react'
import { Project } from '@prisma/client'
import React from 'react'
import { useRouter } from "next/navigation";
import { CameraIcon } from "@radix-ui/react-icons";
interface Props {
    project: Project
}

function ReportsCard({ project }: Props) {
    const router = useRouter()

    return (
        <Card key={project.id} className='p-4' shadow='md'
        >
            <CardBody>
                <h1 className='text-xl font-bold'>{project.proyecto}</h1>
            </CardBody>
            <CardFooter className='flex justify-between'>
                <p className='text-md text-slate-600'>{project.folio}</p>
                <Tooltip content="Ver reporte fotográfico">
                    <CameraIcon className='w-6 h-6 text-slate-600' />

                </Tooltip>
            </CardFooter>

        </Card>
    )
}

export default ReportsCard