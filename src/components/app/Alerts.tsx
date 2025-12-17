import { ShieldAlert, CheckCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const alerts = [
    {
        id: 1,
        title: "Rapid sentiment deterioration detected",
        timestamp: "2024-06-12 09:30 AM",
        acknowledged: true,
    },
    {
        id: 2,
        title: "New high-risk behavior detected",
        timestamp: "2024-06-10 02:15 PM",
        acknowledged: true,
    },
    {
        id: 3,
        title: "Avoidance of financial topics flagged",
        timestamp: "2024-05-28 11:00 AM",
        acknowledged: false,
    }
]

export function Alerts() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Alerts & Monitoring</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4">
            {alerts.map((alert, index) => (
                <li key={alert.id} className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 ${alert.acknowledged ? "text-green-500" : "text-destructive"}`}>
                           {alert.acknowledged ? <CheckCircle className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{alert.title}</p>
                            <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                        </div>
                    </div>
                    {index < alerts.length - 1 && <Separator />}
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  )
}
