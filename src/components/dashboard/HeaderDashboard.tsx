'use client'
import { Button } from '@nextui-org/react'
import { Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

function HeaderDashboard() {
    const router = useRouter()

  return (
    <div className='justify-between flex'>
        <Heading>Crear nuevo proyecto</Heading>
        <Button onClick={() => router.push('/dashboard/project/new')} color="warning" className='text-white'>
          Crear proyecto
        </Button>
      </div>
  )
}

export default HeaderDashboard