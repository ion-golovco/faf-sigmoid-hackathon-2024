"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";
import env from "@/config/env";

type User = {
  id: string;
  username: string;
  email: string;
  url: string;
};

export function Navbar() {
  const [user, setUser] = useState({} as User);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("email");

      if (email && path !== "/") {
        router.push("/chat");
      }
      if (!email && path == "/chat") {
        router.push("/login");
      } else if (email && !user?.username) {
        fetch(`${env.apiUrl}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: localStorage.getItem("email") }),
        })
          .then((res) => res.json())
          .then((userData) => setUser(userData));
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="Informal" height={32} src="/logo.svg" width={32} />
            <p className="font-semibold ml-2 text-lg">Kotik</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarItem className="hidden sm:flex gap-2">
        <ThemeSwitch />
      </NavbarItem>
      <NavbarItem className="flex justify-center items-center gap-2">
        {user?.username ? (
          <>
            <div className="size-8 bg-fuchsia-600 text-white flex items-center justify-center text-xl rounded-full">
              {user?.username?.[0]}
            </div>
            <NextLink href="/chat">{user?.username}</NextLink>
          </>
        ) : (
          <NextLink
            className="p-2 px-4 bg-sky-500 rounded-full text-white"
            href="/register"
          >
            Register
          </NextLink>
        )}
      </NavbarItem>
    </NextUINavbar>
  );
}
