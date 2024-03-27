'use client'
import { Heading } from "@radix-ui/themes"
import { useSession } from 'next-auth/react';


function HeadingProyectos() {
    const { data: session } = useSession();

    return (
        <Heading>
            {
                session?.user?.role === 'administrativo' ? 'Administrativo' : 'Operativo'
            } dashboard
        </Heading>
    )
}

export default HeadingProyectos