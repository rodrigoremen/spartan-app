import TablaHome from '@/components/TablaHome'
import HeadingProyectos from '@/components/projects/HeadingProyectos'
import { DashboardIcon } from '@radix-ui/react-icons'
import prisma from "@/libs/prisma";
import React from 'react'


async function loadProjects() {
  return await prisma.project.findMany(
    {
      include: {
        acuerdos: true,
      },
    }
  )
}

async function ProyectosPage() {
  const projects = await loadProjects()
  console.log(projects)
  return (
    <div className='mx-auto container justify-center mt-10 max-auto w-2/3'>
      <div className='flex gap-4 mb-8'>
        <DashboardIcon className='w-8 h-8 inline-block' />
        <HeadingProyectos />
      </div>
      <TablaHome projects={projects} />

    </div>
  )
}

export default ProyectosPage