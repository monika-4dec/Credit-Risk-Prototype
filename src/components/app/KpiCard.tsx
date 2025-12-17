import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import type { ReactNode } from 'react';

type KpiCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  footerText: string;
};

export function KpiCard({ title, value, icon, footerText }: KpiCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
       <CardFooter>
        <p className="text-xs text-muted-foreground">{footerText}</p>
       </CardFooter>
    </Card>
  );
}
