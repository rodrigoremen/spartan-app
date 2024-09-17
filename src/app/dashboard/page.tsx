import React from 'react'
import { Container } from '@radix-ui/themes'
import HeaderDashboard from '@/components/dashboard/HeaderDashboard'
import prisma from "@/libs/prisma";
import ProjectCard from '@/components/projects/ProjectCard';

async function loadProjects() {
  return await prisma.project.findMany()
}

async function DashboardPage() {
  const projects = await loadProjects()
  return (
        <Container className='mt-10 px-10'>
      <HeaderDashboard />
      <div className='mt-10'>
        <div className='gap-3 grid md:grid-cols-3'>
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className='flex justify-center'>
            <p className='text-lg text-foreground-600'>No hay proyectos registrados</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default DashboardPage