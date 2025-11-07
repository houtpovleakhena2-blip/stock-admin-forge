import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import SummaryCard from "@/components/SummaryCard";
import LowStockTable from "@/components/LowStockTable";
import { Package, AlertTriangle, Receipt, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            Dashboard Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Total Items"
              value={14}
              icon={Package}
              variant="info"
            />
            <SummaryCard
              title="Low Stock Alert"
              value={4}
              icon={AlertTriangle}
              variant="destructive"
            />
            <SummaryCard
              title="Total Transactions"
              value={28}
              icon={Receipt}
              variant="success"
            />
            <SummaryCard
              title="Total Stock Value"
              value="₹385,231.00"
              icon={DollarSign}
              variant="info"
            />
          </div>

          <LowStockTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
