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


function NavBar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        'Home',
        'Iniciar Sesión',
        'Registrar',
        'Dashboard',
        'Log Out',
    ];
    
    return (
        <Navbar
            className='bg-white-500 dark:bg-zinc-950'
            isBordered
            shouldHideOnScroll
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                />
            </NavbarContent>
            <NavbarContent justify="start">
                <LogoSpartan />
                <NavbarBrand className="mr-4">
                    <Link href="/" aria-current="page" color="foreground">
                        <p className="hidden sm:block font-bold text-inherit">SPARTAN</p>
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
                                <Link href="/inicio" aria-current="page" color="foreground" className='font-bold'>
                                    Dashboard
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link href="/dashboard" aria-current="page" color="foreground" className='font-bold'>
                                    Proyectos
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                    <Link href="/reports" color="foreground" className='font-bold'>
                                        Reportes
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
                                        name="Jason Hughes"
                                        size="sm"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                        
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Hola!</p>
                                        <p className="font-semibold">{session?.user?.name}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">Mi configuración</DropdownItem>
                                    <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    )
                }
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;
