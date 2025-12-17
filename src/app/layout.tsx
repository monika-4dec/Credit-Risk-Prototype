import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/app/Header';
import { SidebarNav } from '@/components/app/SidebarNav';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'CreditWise Sentinel',
  description: 'AI-powered behavioural credit risk insights',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
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
        <Toaster />
      </body>
    </html>
  );
}
