'use client'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { Project } from '@prisma/client'
import React from 'react'
import { useRouter } from "next/navigation";

interface Props {
    project: Project
}

function ProjectCard({ project }: Props) {

    const router = useRouter()

    return (
        <Card key={project.id} className='p-4' shadow='md'
        isPressable onPress={() => router.push(`/dashboard/project/${project.id}`)}
        >
            <CardBody>
                <h1 className='text-xl font-bold'>{project.proyecto}</h1>
            </CardBody>
            <CardFooter>
                <p className='text-md text-slate-600'>{project.folio}</p>
            </CardFooter>
        </Card>
    )
}

export default ProjectCard