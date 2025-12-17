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
                d="M3.328 27.5V4.5H19.232V8.46H7.56V14.04H18.224V17.98H7.56V23.54H19.424V27.5H3.328ZM23.36 27.5V4.5H27.592L32.848 12.336L38.048 4.5H42.224V27.5H38.048V10.136L33.04 17.736H32.656L27.592 10.08V27.5H23.36ZM45.184 27.5V4.5H59.16V8.46H49.36V14.04H58.152V17.98H49.36V23.54H59.352V27.5H45.184Z"
                fill="currentColor"
                />
            </svg>
            <p className="text-xs text-sidebar-foreground/80 pl-1">
                A prototype for EXL
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
            <SidebarMenuButton asChild isActive={pathname === '/borrowers'}>
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
