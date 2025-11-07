import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { ReportFilters as ReportFiltersType } from "@/pages/Reports";

interface ReportFiltersProps {
  filters: ReportFiltersType;
  onFiltersChange: (filters: ReportFiltersType) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Office Supplies", label: "Office Supplies" },
  { value: "Hardware", label: "Hardware" },
  { value: "Software", label: "Software" },
];

const reportTypes = [
  { value: "overview", label: "Overview" },
  { value: "stock-value", label: "Stock Value Analysis" },
  { value: "low-stock", label: "Low Stock Report" },
  { value: "category-distribution", label: "Category Distribution" },
];

const ReportFilters = ({ filters, onFiltersChange }: ReportFiltersProps) => {
  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      category: value,
    });
  };

  const handleReportTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      reportType: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Report Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={filters.dateRange.startDate}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={filters.dateRange.endDate}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reportType">Report Type</Label>
          <Select value={filters.reportType} onValueChange={handleReportTypeChange}>
            <SelectTrigger id="reportType">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
