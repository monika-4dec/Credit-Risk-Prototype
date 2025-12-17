'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import type { Borrower, RiskClassification } from '@/lib/types';

type BorrowersTableProps = {
  borrowers: Borrower[];
};

type SortKey = keyof Pick<Borrower, 'name' | 'traditionalCreditScore'> | 'aiScore';

const riskVariantMap: Record<RiskClassification, 'destructive' | 'secondary' | 'default'> = {
  High: 'destructive',
  Moderate: 'secondary',
  Low: 'default',
};

export function BorrowersTable({ borrowers: initialBorrowers }: BorrowersTableProps) {
  const [borrowers, setBorrowers] = useState(initialBorrowers);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>(null);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortArray(key, direction);
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
        return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <ArrowUpDown className="ml-2 h-4 w-4" /> : 
      <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const sortArray = (key: SortKey, direction: 'ascending' | 'descending') => {
    const sortedData = [...borrowers].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      if (key === 'aiScore') {
        aValue = a.aiCognitiveRisk.score;
        bValue = b.aiCognitiveRisk.score;
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setBorrowers(sortedData);
  };

  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
                <Button variant="ghost" onClick={() => requestSort('name')}>
                    Borrower {getSortIndicator('name')}
                </Button>
            </TableHead>
            <TableHead className="text-center">Loan Type</TableHead>
            <TableHead className="text-right">
                <Button variant="ghost" onClick={() => requestSort('traditionalCreditScore')}>
                    Trad. Score {getSortIndicator('traditionalCreditScore')}
                </Button>
            </TableHead>
            <TableHead className="text-right">
                <Button variant="ghost" onClick={() => requestSort('aiScore')}>
                    AI Risk Score {getSortIndicator('aiScore')}
                </Button>
            </TableHead>
            <TableHead className="text-center">AI Risk Level</TableHead>
            <TableHead className="text-center">RM</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowers.map((borrower) => (
            <TableRow key={borrower.id}>
              <TableCell className="font-medium">
                <Link href={`/borrowers/${borrower.id}`} className="hover:underline text-primary">
                  {borrower.name}
                </Link>
                <div className="text-xs text-muted-foreground">{borrower.borrowerId}</div>
              </TableCell>
              <TableCell className="text-center">{borrower.loan.type}</TableCell>
              <TableCell className="text-right">{borrower.traditionalCreditScore}</TableCell>
              <TableCell className="text-right">{borrower.aiCognitiveRisk.score}</TableCell>
              <TableCell className="text-center">
                <Badge variant={riskVariantMap[borrower.aiCognitiveRisk.classification]} className="w-20 justify-center">
                  {borrower.aiCognitiveRisk.classification}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{borrower.rmName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
