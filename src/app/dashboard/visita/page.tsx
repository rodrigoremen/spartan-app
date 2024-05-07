import HeaderVisitia from '@/components/visita/HeaderVisitia'
import { Container } from '@radix-ui/themes'
import React from 'react'
import prisma from '@/libs/prisma'
import VisitasCards from '@/components/visita/VisitasCards'

async function loadVisitas() {
  return await prisma.visita.findMany()
}
async function VisitaPage() {
  const visita = await loadVisitas()
  return (
    <div>
        <Container className='mt-10 px-10 '>
        <HeaderVisitia/>
        <div className='mt-10'>
          <div className='gap-3 grid md:grid-cols-3'>
            {visita.map((visita) => (
              <VisitasCards key={visita.id} visita={visita} />
            ))}
          </div>
        </div>
        </Container>
    </div>
  )
}
export default VisitaPage
