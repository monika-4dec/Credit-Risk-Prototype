import {
  Users,
  PieChart as PieChartIcon,
  TrendingUp,
  Filter,
} from 'lucide-react';
import { portfolioStats, borrowers } from '@/lib/mock-data';

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

export default function PortfolioOverview() {
  const { totalBorrowers, riskDistribution, newlyFlagged, riskTrend } = portfolioStats;
  const highRiskBorrowers =
    (riskDistribution.high / totalBorrowers) * 100;

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Total Borrowers"
          value={totalBorrowers.toLocaleString()}
          icon={<Users className="h-5 w-5" />}
          footerText="Total borrowers actively monitored."
        />
        <KpiCard
          title="High-Risk Accounts"
          value={riskDistribution.high.toString()}
          icon={<PieChartIcon className="h-5 w-5" />}
          footerText={`${highRiskBorrowers.toFixed(1)}% of total portfolio`}
        />
        <KpiCard
          title="Newly Flagged High-Risk"
          value={`+${newlyFlagged}`}
          icon={<TrendingUp className="h-5 w-5" />}
          footerText="In the last 30 days"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RiskDistributionChart data={riskDistribution} />
        <RiskTrendChart data={riskTrend} />
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
