'use client';

import { useState } from 'react';
import {
  Users,
  PieChart as PieChartIcon,
  TrendingUp,
  Filter,
  UploadCloud,
  FileText,
} from 'lucide-react';
import Papa from 'papaparse';

import { borrowers as initialBorrowers, portfolioStats as initialPortfolioStats } from '@/lib/mock-data';
import type { Borrower, PortfolioStats, RiskClassification } from '@/lib/types';
import { KpiCard } from '@/components/app/KpiCard';
import { RiskDistributionChart } from '@/components/app/RiskDistributionChart';
import { RiskTrendChart } from '@/components/app/RiskTrendChart';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

function CsvUploader({ onDataUploaded }: { onDataUploaded: (data: Borrower[]) => void }) {
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      Papa.parse<any>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const parsedData = results.data.map(row => ({
                id: row.id,
                name: row.name,
                borrowerId: row.borrowerId,
                loan: {
                    amount: parseFloat(row.loan_amount),
                    tenure: parseInt(row.loan_tenure),
                    type: row.loan_type
                },
                repaymentStatus: row.repaymentStatus,
                traditionalCreditScore: parseInt(row.traditionalCreditScore),
                aiCognitiveRisk: {
                    score: parseInt(row.ai_score),
                    classification: row.ai_classification as RiskClassification,
                    confidence: parseFloat(row.ai_confidence),
                    trend: row.ai_trend,
                    changeFromPrevious: parseInt(row.ai_change),
                },
                behavioralDrivers: row.behavioral_drivers.split(';'),
                linguisticSignals: row.linguistic_signals.split(';'),
                conversations: [], // CSV does not contain conversation data
                geography: row.geography,
                segment: row.segment,
                rmName: row.rmName
            }));
            onDataUploaded(parsedData);
            toast({
                title: 'Upload Successful',
                description: `${parsedData.length} records loaded from ${file.name}`,
            });
          } catch (error) {
              console.error("Error parsing CSV:", error);
              toast({
                  variant: 'destructive',
                  title: 'Upload Failed',
                  description: 'Could not parse the CSV file. Please check the format.',
              });
          }
        },
        error: (error) => {
            console.error("PapaParse error:", error);
            toast({
                variant: 'destructive',
                title: 'Upload Failed',
                description: 'An error occurred while reading the file.',
            });
        }
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Borrower Data</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        <label htmlFor="csv-upload" className="w-full cursor-pointer border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-muted/50">
            <UploadCloud className="h-10 w-10 text-muted-foreground" />
            <span className="mt-2 text-sm font-medium text-foreground">
              Click to upload a file
            </span>
            <span className="text-xs text-muted-foreground">CSV up to 10MB</span>
            <Input
                id="csv-upload"
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
            />
        </label>
        {fileName && 
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{fileName}</span>
            </div>
        }
        <a href="/borrowers.csv" download className="text-sm text-primary hover:underline">Download Sample CSV</a>
      </CardContent>
    </Card>
  );
}


export default function PortfolioOverview() {
  const [borrowers, setBorrowers] = useState<Borrower[]>(initialBorrowers);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats>(initialPortfolioStats);

  const handleDataUploaded = (newBorrowers: Borrower[]) => {
    setBorrowers(newBorrowers);

    const newTotalBorrowers = newBorrowers.length;
    const newRiskDistribution = newBorrowers.reduce((acc, b) => {
        acc[b.aiCognitiveRisk.classification.toLowerCase() as keyof typeof acc]++;
        return acc;
    }, { low: 0, moderate: 0, high: 0 });

    // Note: Some stats like 'newlyFlagged' and 'riskTrend' would require more complex logic
    // or time-series data not present in a single CSV upload. We'll keep them static for now.
    setPortfolioStats(prevStats => ({
        ...prevStats,
        totalBorrowers: newTotalBorrowers,
        riskDistribution: newRiskDistribution,
    }));
  };

  const highRiskBorrowers =
    portfolioStats.totalBorrowers > 0 ? (portfolioStats.riskDistribution.high / portfolioStats.totalBorrowers) * 100 : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Portfolio Overview
        </h1>
        <p className="text-muted-foreground">
          High-level behavioral credit risk insights for your portfolio.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <CsvUploader onDataUploaded={handleDataUploaded} />
        </div>
        <div className="md:col-span-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <KpiCard
            title="Total Borrowers"
            value={portfolioStats.totalBorrowers.toLocaleString()}
            icon={<Users className="h-5 w-5" />}
            footerText="Total borrowers actively monitored."
            />
            <KpiCard
            title="High-Risk Accounts"
            value={portfolioStats.riskDistribution.high.toString()}
            icon={<PieChartIcon className="h-5 w-5" />}
            footerText={`${highRiskBorrowers.toFixed(1)}% of total portfolio`}
            />
            <KpiCard
            title="Newly Flagged High-Risk"
            value={`+${portfolioStats.newlyFlagged}`}
            icon={<TrendingUp className="h-5 w-5" />}
            footerText="In the last 30 days"
            />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RiskDistributionChart data={portfolioStats.riskDistribution} />
        <RiskTrendChart data={portfolioStats.riskTrend} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight font-headline">
            All Borrowers
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
