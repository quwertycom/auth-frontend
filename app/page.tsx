'use client';

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import MaterialSymbol from './components/materialSymbol';
import TransitionLink from './components/transitionLink';
import { useNavigateWithAnimation } from './utils/NavigateWithAnimation';

export default function Home() {
  const navigate = useNavigateWithAnimation();

  return (
    <div className="h-screen w-screen">
      <Navbar>
        <NavbarBrand className="flex flex-row items-center gap-2">
          <MaterialSymbol symbol="badge" size={32} />
          <span className="text-2xl font-bold">qAuth</span>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <TransitionLink href="/app/auth/login" color="foreground">
              Login
            </TransitionLink>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              onPress={() => navigate({ href: '/app/auth/register' })}
            >
              Register
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mx-auto flex h-full w-full max-w-[1920px] flex-col items-center justify-start">
          <div className="flex h-full max-h-[1080px] w-full flex-row items-center justify-center">
            <div className="flex h-full w-full max-w-5xl flex-col items-center justify-center">
              <h1 className="text-4xl font-bold">QUWERTY Auth</h1>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
