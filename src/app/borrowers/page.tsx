'use client';

import { useState } from 'react';
import {
  Users,
  Filter,
} from 'lucide-react';

import { borrowers as initialBorrowers } from '@/lib/mock-data';
import type { Borrower } from '@/lib/types';
import { BorrowersTable } from '@/components/app/BorrowersTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export default function BorrowersPage() {
  const [borrowers, setBorrowers] = useState<Borrower[]>(initialBorrowers);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          All Borrowers
        </h1>
        <p className="text-muted-foreground">
          Browse and manage all borrowers in your portfolio.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight font-headline">
            Borrower List
            </h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Loan Type</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Geography</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Segment</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>RM Name</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <BorrowersTable borrowers={borrowers} />
      </div>
    </div>
  );
}
