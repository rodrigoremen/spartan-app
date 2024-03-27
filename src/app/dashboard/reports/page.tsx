import React from 'react'
import { Container } from '@radix-ui/themes'
import prisma from "@/libs/prisma";
import ReportsCard from '@/components/reports/ReportsCard';
import HeaderReports from '@/components/reports/HeaderReports';

async function loadProjects() {
    return await prisma.project.findMany()
  }
  
async function ReportsPage() {
    const projects = await loadProjects()
    
    return (
      <Container className='mt-10 px-10 '>
        <HeaderReports/>
        <div className='mt-10'>
          <div className='gap-3 grid md:grid-cols-3'>
            {projects.map((project) => (
              <ReportsCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Container>
    )
}

export default ReportsPage