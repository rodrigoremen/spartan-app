import React from 'react'
import { Container, Grid } from '@radix-ui/themes'
import HeaderDashboard from '@/components/dashboard/HeaderDashboard'
import prisma from "@/libs/prisma";
import ProjectCard from '@/components/projects/ProjectCard';

async function loadProjects() {
  return await prisma.project.findMany()
}

async function DashboardPage() {
  const projects = await loadProjects()
  console.log(projects)
  return (
    <Container className='mt-10'>
      <HeaderDashboard />
      <div className='mt-10'>
        <Grid columns="3" className='gap-3'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      </div>
    </Container>
  )
}

export default DashboardPage