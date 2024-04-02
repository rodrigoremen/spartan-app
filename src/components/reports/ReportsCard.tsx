'use client'
import { Button, Card, CardBody, CardFooter, Tooltip } from '@nextui-org/react'
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
                <Button isIconOnly variant="light" onPress={() => router.push(`/dashboard/reports/${project.id}`)} className="text-lg flex justify-center cursor-pointer active:opacity-50">
                    <CameraIcon className='w-6 h-6 text-slate-600' />
                </Button>
                </Tooltip>
            </CardFooter>

        </Card>
    )
}

export default ReportsCard