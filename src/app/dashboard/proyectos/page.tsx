import TablaHome from '@/components/TablaHome'
import HeadingProyectos from '@/components/projects/HeadingProyectos'
import { DashboardIcon } from '@radix-ui/react-icons'
import React from 'react'

function ProyectosPage() {
  return (
    <div className='mx-auto container justify-center mt-10 max-auto w-2/3'>
      <div className='flex gap-4 mb-8'>
        <DashboardIcon className='w-8 h-8 inline-block' />
        <HeadingProyectos/>
      </div>
      <TablaHome />

    </div>
  )
}

export default ProyectosPage