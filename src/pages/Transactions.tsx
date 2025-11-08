import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionTable";

export interface Transaction {
  id: string;
  transaction_type: "purchase" | "sale" | "adjustment";
  item_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  supplier?: string;
  customer?: string;
  notes?: string;
  created_at: string;
  created_by?: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsDialogOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });

      fetchTransactions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
            <Button onClick={handleAddTransaction} className="gap-2">
              <Plus className="h-5 w-5" />
              Add Transaction
            </Button>
          </div>

          <TransactionTable
            transactions={transactions}
            loading={loading}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
                </DialogTitle>
              </DialogHeader>
              <TransactionForm
                transaction={editingTransaction}
                onSuccess={handleFormSuccess}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
