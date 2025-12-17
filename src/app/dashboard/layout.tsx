import { Header } from '@/components/app/Header';
import { SidebarNav } from '@/components/app/SidebarNav';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarRail />
      <SidebarInset>
        <div className="flex flex-col h-full">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
                {children}
            </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
