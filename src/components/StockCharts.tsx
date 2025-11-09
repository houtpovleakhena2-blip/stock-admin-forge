import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ReportFilters } from "@/pages/Reports";

interface StockChartsProps {
  filters: ReportFilters;
}

const categoryData = [
  { name: "Electronics", value: 156000, items: 20 },
  { name: "Furniture", value: 120000, items: 8 },
  { name: "Office Supplies", value: 45000, items: 45 },
  { name: "Hardware", value: 32000, items: 15 },
  { name: "Software", value: 32231, items: 12 },
];

const monthlyData = [
  { month: "Jan", stockValue: 320000, transactions: 45 },
  { month: "Feb", stockValue: 340000, transactions: 52 },
  { month: "Mar", stockValue: 355000, transactions: 48 },
  { month: "Apr", stockValue: 365000, transactions: 55 },
  { month: "May", stockValue: 375000, transactions: 61 },
  { month: "Jun", stockValue: 380000, transactions: 58 },
  { month: "Jul", stockValue: 385231, transactions: 64 },
];

const lowStockData = [
  { name: "USB Flash Drive", quantity: 8, minStock: 10, deficit: 2 },
  { name: "Stapler", quantity: 5, minStock: 10, deficit: 5 },
  { name: "Printer Ink", quantity: 7, minStock: 10, deficit: 3 },
  { name: "Office Chair", quantity: 4, minStock: 8, deficit: 4 },
];

const COLORS = ["#2A6EBB", "#28A745", "#E74C3C", "#F39C12", "#9B59B6"];

const StockCharts = ({ filters }: StockChartsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Stock Value by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: $${(entry.value / 1000).toFixed(0)}K`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Items by Category Bar Chart */}
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Items Count by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="items" fill="#2A6EBB" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Stock Value Trend */}
      <Card className="p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Monthly Stock Value & Transactions Trend
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="stockValue"
              stroke="#2A6EBB"
              strokeWidth={2}
              name="Stock Value ($)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="transactions"
              stroke="#28A745"
              strokeWidth={2}
              name="Transactions"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Low Stock Analysis */}
      <Card className="p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Low Stock Alert Analysis
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={lowStockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#E74C3C" name="Current Stock" />
            <Bar dataKey="minStock" fill="#28A745" name="Min Required" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-md bg-info text-info-foreground">
          <h4 className="text-sm font-medium opacity-90 mb-2">
            Total Categories
          </h4>
          <p className="text-3xl font-bold">{categoryData.length}</p>
        </Card>
        <Card className="p-6 shadow-md bg-success text-success-foreground">
          <h4 className="text-sm font-medium opacity-90 mb-2">
            Total Stock Items
          </h4>
          <p className="text-3xl font-bold">
            {categoryData.reduce((sum, cat) => sum + cat.items, 0)}
          </p>
        </Card>
        <Card className="p-6 shadow-md bg-destructive text-destructive-foreground">
          <h4 className="text-sm font-medium opacity-90 mb-2">
            Items Below Min Stock
          </h4>
          <p className="text-3xl font-bold">{lowStockData.length}</p>
        </Card>
      </div>
    </div>
  );
};

export default StockCharts;
