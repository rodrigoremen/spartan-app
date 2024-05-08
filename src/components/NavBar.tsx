'use client';
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import LogoSpartan from './icons/Logo';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation'



function NavBar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter()

    return (
        <Navbar
            className='bg-white-500 dark:bg-black-500'
            isBordered

            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                />
            </NavbarContent>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link href="/" aria-current="page" color="foreground">
                        <LogoSpartan />
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3">
                    {
                        !session && (
                            <>
                                <NavbarItem>
                                    <Link href="/auth/register" aria-current="page" color="foreground" className='font-bold'>
                                        Registrar
                                    </Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Link href="/auth/login" color="foreground" className='font-bold'>
                                        Inicio de sesión
                                    </Link>
                                </NavbarItem>
                            </>
                        )
                    }
                    {
                        session && (
                            <>
                                <NavbarItem>
                                    <Link href="/dashboard/proyectos" aria-current="page" color="foreground" className='font-bold'>
                                        Dashboard
                                    </Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Link href="/dashboard" aria-current="page" color="foreground" className='font-bold'>
                                        Proyectos
                                    </Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Link href="/dashboard/reports" color="foreground" className='font-bold'>
                                        Archivos adjuntos
                                    </Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Link href="/dashboard/visita" color="foreground" className='font-bold'>
                                        Reporte de visita
                                    </Link>
                                </NavbarItem>
                            </>
                        )
                    }
                </NavbarContent>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                {
                    session && (
                        <>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="warning"
                                        name={session?.user?.name}
                                        size="sm"
                                        showFallback
                                        fallback={<PersonIcon className="animate-pulse w-6 h-6 text-black" />}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Hola!</p>
                                        <p className="font-semibold">{session?.user?.name}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings" onClick={() => router.push('../auth/config/')}>Mi configuración</DropdownItem>
                                    <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                                        Cerrar sesión
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    )
                }
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenu>
                    {!session ? (
                        <>
                            <NavbarMenuItem>
                                <Link href="/auth/register" color="foreground">Registrar</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/auth/login" color="foreground">Inicio de sesión</Link>
                            </NavbarMenuItem>
                        </>
                    ) : (
                        <>
                            <NavbarMenuItem>
                                <Link href="/dashboard/proyectos" color="foreground">Dashboard</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/dashboard" color="foreground">Proyectos</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/dashboard/reports" color="foreground">Reportes</Link>
                            </NavbarMenuItem>
                        </>
                    )}
                </NavbarMenu>

            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;
