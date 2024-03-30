'use client'
import { Button } from '@nextui-org/react'
import { Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';


import React from 'react'

function HeaderDashboard() {
  const router = useRouter()
  const { data: session } = useSession();

  return (

    <div className='justify-between flex'>
      <div>
        <Heading>Bienvenido de vuelta {session?.user?.name} </Heading>
        <p className='text-sm'>Vamos a crear un proyecto nuevo!🎉</p>
      </div>
      {
        session?.user?.role === 'administrativo' ? (
          <Button onClick={() => router.push('/dashboard/project/new')} color="warning" variant="flat">
            Crear proyecto
          </Button>
        ) : null
      }

    </div>
  )
}

export default HeaderDashboard