import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import StockForm from "@/components/StockForm";
import StockTable from "@/components/StockTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
  minStock: number;
}

const Stock = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: "STK20250001",
      name: "Laptop Dell Inspiron",
      category: "Electronics",
      quantity: 12,
      unitPrice: 45000,
      supplier: "Tech Solutions Ltd",
      minStock: 5,
    },
    {
      id: "STK20250002",
      name: "Office Desk",
      category: "Furniture",
      quantity: 8,
      unitPrice: 15000,
      supplier: "Furniture World",
      minStock: 3,
    },
    {
      id: "STK20250003",
      name: "Whiteboard Marker",
      category: "Office Supplies",
      quantity: 45,
      unitPrice: 50,
      supplier: "Stationery Plus",
      minStock: 20,
    },
    {
      id: "STK20250004",
      name: "USB Flash Drive 32GB",
      category: "Electronics",
      quantity: 8,
      unitPrice: 800,
      supplier: "Tech Solutions Ltd",
      minStock: 10,
    },
    {
      id: "STK20250005",
      name: "Stapler",
      category: "Office Supplies",
      quantity: 5,
      unitPrice: 150,
      supplier: "Stationery Plus",
      minStock: 10,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  const handleAddItem = (item: Omit<StockItem, "id">) => {
    const newId = `STK${Date.now()}`;
    setStockItems([...stockItems, { ...item, id: newId }]);
    setIsDialogOpen(false);
  };

  const handleEditItem = (item: StockItem) => {
    setStockItems(stockItems.map((i) => (i.id === item.id ? item : i)));
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setStockItems(stockItems.filter((item) => item.id !== id));
  };

  const openEditDialog = (item: StockItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Manage Stock</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={() => setEditingItem(null)}>
                  <Plus className="h-4 w-4" />
                  Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Edit Stock Item" : "Add New Stock Item"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingItem
                      ? "Update the details of the stock item below."
                      : "Fill in the details to add a new item to inventory."}
                  </DialogDescription>
                </DialogHeader>
                <StockForm
                  onSubmit={editingItem ? handleEditItem : handleAddItem}
                  initialData={editingItem}
                  onCancel={handleDialogClose}
                />
              </DialogContent>
            </Dialog>
          </div>

          <StockTable
            items={stockItems}
            onEdit={openEditDialog}
            onDelete={handleDeleteItem}
          />
        </main>
      </div>
    </div>
  );
};

export default Stock;
