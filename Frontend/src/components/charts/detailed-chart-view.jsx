"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KundliChart } from "./kundli-chart";
import { ArrowLeft } from "lucide-react";
export function DetailedChartView({ chartData, title, onBack }) {
    return (<div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2"/>
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">{title} - Detailed View</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card>
          <CardContent className="p-8">
            <KundliChart chartData={chartData} title={title} size="large"/>
          </CardContent>
        </Card>

        {/* Chart Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Key Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Strong planetary combinations in houses 1, 5, and 9</li>
                <li>• Favorable aspects between Jupiter and Venus</li>
                <li>• Mars positioned in own sign showing strength</li>
                <li>• Moon in exaltation providing emotional stability</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Recommendations:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Focus on spiritual practices during Jupiter periods</li>
                <li>• Career advancement likely in creative fields</li>
                <li>• Favorable time for relationships and partnerships</li>
                <li>• Health requires attention to digestive system</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, i) => (<Card key={i}>
            <CardContent className="p-4">
              <KundliChart chartData={chartData} title={`D-${i + 1}`} size="small"/>
            </CardContent>
          </Card>))}
      </div>
    </div>);
}
