import { AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const lowStockItems = [
  {
    id: "STK20250005",
    name: "USB Flash Drive 32GB",
    category: "Electronics",
    quantity: 8,
  },
  {
    id: "STK20250006",
    name: "Stapler",
    category: "Office Supplies",
    quantity: 5,
  },
  {
    id: "STK20250008",
    name: "Printer Ink Cartridge",
    category: "Electronics",
    quantity: 7,
  },
  {
    id: "STK20250009",
    name: "Office Chair",
    category: "Furniture",
    quantity: 4,
  },
];

const LowStockTable = () => {
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <h2 className="text-xl font-bold text-destructive">Low Stock Alert</h2>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="font-semibold">Item ID</TableHead>
              <TableHead className="font-semibold">Item Name</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map((item) => (
              <TableRow key={item.id} className="bg-alert hover:bg-alert/80">
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right font-semibold">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LowStockTable;
