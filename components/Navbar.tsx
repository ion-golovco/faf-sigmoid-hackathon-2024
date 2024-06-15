'use client';

import { Navbar as NextUINavbar, NavbarContent, NavbarBrand, NavbarItem } from '@nextui-org/navbar';
import NextLink from 'next/link';
import Image from 'next/image';

import { ThemeSwitch } from '@/components/theme-switch';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [user, setUser] = useState({ name: 'John Doe' });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = { name: 'Jane Doe' }; // Simulated user data
      setUser(userData);
    };

    fetchUserData();
  }, []);

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full"
        justify="start"
      >
        <NavbarBrand
          as="li"
          className="gap-3 max-w-fit"
        >
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/"
          >
            <Image
              src="/logo.svg"
              alt="Informal"
              width={32}
              height={32}
            />
            <p className="font-semibold ml-2 text-lg">Informal</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          {user?.name ? (
            <NextLink href="/profile">{user?.name}</NextLink>
          ) : (
            <NextLink href="/register">Register</NextLink>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
