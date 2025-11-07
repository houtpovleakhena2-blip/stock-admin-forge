import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import StockCharts from "@/components/StockCharts";
import ReportFilters from "@/components/ReportFilters";
import { Card } from "@/components/ui/card";

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ReportFilters {
  dateRange: DateRange;
  category: string;
  reportType: string;
}

const Reports = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      startDate: "2025-01-01",
      endDate: "2025-11-02",
    },
    category: "all",
    reportType: "overview",
  });

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Reports & Charts
          </h2>

          <Card className="p-6 mb-6 shadow-md">
            <ReportFilters filters={filters} onFiltersChange={setFilters} />
          </Card>

          <StockCharts filters={filters} />
        </main>
      </div>
    </div>
  );
};

export default Reports;
