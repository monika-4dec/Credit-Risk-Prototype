'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col items-start gap-2">
            <svg
                width="80"
                height="32"
                viewBox="0 0 80 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#FF4F00]"
            >
                <path
                d="M3.328 27.5V4.5H19.232V8.46H7.56V14.04H18.224V17.98H7.56V23.54H19.424V27.5H3.328ZM24 4.5L30 16L24 27.5H28.5L32.5 19.5L36.5 27.5H41L35 16L41 4.5H36.5L32.5 12.5L28.5 4.5H24ZM45.184 27.5V4.5H49.36V23.54H59.352V27.5H45.184Z"
                fill="currentColor"
                />
            </svg>
            <p className="text-xs text-sidebar-foreground/80 pl-1">
                Client engagement prototype for cognitive credit risk profiling
            </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/'}>
              <Link href="/">
                <LayoutDashboard />
                Portfolio Overview
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/borrowers')}>
              <Link href="/borrowers">
                <Users />
                Borrowers
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
