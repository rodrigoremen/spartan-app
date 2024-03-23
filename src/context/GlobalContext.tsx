'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from "sonner";

interface Props {
    children: React.ReactNode
}

function GlobalContext({ children }: Props) {
    return (
        <SessionProvider>
            {children}
            <Toaster richColors position="top-right"/>
        </SessionProvider>
    )
}

export default GlobalContext