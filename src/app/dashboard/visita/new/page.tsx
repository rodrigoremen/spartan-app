import { Card } from '@nextui-org/react'
import { Container, Flex } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
const VisitaForm = dynamic(() => import('@/components/visita/VisitaForm'), { ssr: false });

function VisitaNew() {
  return (
      <Container height="100%" className=' mt-8  mb-4'>
        <Card className=' p-5'>
          
            <VisitaForm/>
          
        </Card>
      </Container>
  )
}

export default VisitaNew