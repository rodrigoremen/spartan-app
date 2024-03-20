'use client'
import React from 'react'
import { Container, Heading } from '@radix-ui/themes'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

function DashboardPage() {
  const router = useRouter()
  return (
    <Container className='mt-10'>
      <div className='justify-between flex'>
        <Heading>Crear nuevo proyecto</Heading>
        <Button onClick={() => router.push('/dashboard/project/new')} color="warning" className='text-white'>
          Crear
        </Button>
      </div>
    </Container>
  )
}

export default DashboardPage