'use client'
import { Button, User, Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

function InicioPage() {
    const router = useRouter()
    return (
        <div className="bg-white dark:bg-black">
            <div className="relative isolate px-6 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-24 sm:py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Spartan App
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-gray-300">
                            Bienvenido a Spartan App, la aplicación que te ayudará a organizar tus proyectos y servicios de manera eficiente.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Button variant="flat" color='warning' onClick={() => router.push('/dashboard/project/new')} >
                                Registra un proyecto!
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
            <footer className="">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex justify-center sm:justify-start">
                            <User
                                name="Rodrigo Dorantes"
                                description={(
                                    <Link href="https://github.com/rodrigoremen" size="sm" isExternal>
                                        @rodrigoremen
                                    </Link>
                                )}
                                avatarProps={{
                                    src: "https://avatars.githubusercontent.com/u/106606020?v=4"
                                }}
                            />
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                            Copyright &copy; 2022. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default InicioPage