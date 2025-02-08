'use client';

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import MaterialSymbol from "./components/materialSymbol";
import TransitionLink from "./components/transitionLink";
import { useNavigateWithAnimation } from "./utils/NavigateWithAnimation";

export default function Home() {
  const navigate = useNavigateWithAnimation();

  return (
    <div className="w-screen h-screen">
      <Navbar>
        <NavbarBrand className="flex flex-row items-center gap-2">
          <MaterialSymbol symbol="badge" size={32} />
          <span className="text-2xl font-bold">qAuth</span>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem> 
            <TransitionLink href="/app/auth/login" color="foreground">Login</TransitionLink>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="flat" onPress={() => navigate({href: '/app/auth/register'})}>Register</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
