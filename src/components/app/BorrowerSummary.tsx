import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Borrower } from "@/lib/types"

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}

export function BorrowerSummary({ borrower }: { borrower: Borrower }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Borrower Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DataRow label="Borrower ID" value={borrower.borrowerId} />
        <DataRow
          label="Loan Amount"
          value={`$${borrower.loan.amount.toLocaleString()}`}
        />
        <DataRow label="Loan Type" value={borrower.loan.type} />
        <DataRow label="Tenure" value={`${borrower.loan.tenure} months`} />
        <DataRow label="Repayment Status" value={borrower.repaymentStatus} />
        <DataRow
          label="Traditional Credit Score"
          value={borrower.traditionalCreditScore}
        />
      </CardContent>
    </Card>
  )
}
