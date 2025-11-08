import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Transaction } from "@/pages/Transactions";

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const getTypeBadgeVariant = (type: string) => {
  switch (type) {
    case "purchase":
      return "default";
    case "sale":
      return "secondary";
    case "adjustment":
      return "outline";
    default:
      return "outline";
  }
};

const TransactionTable = ({ transactions, loading, onEdit, onDelete }: TransactionTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transaction_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="flex items-center justify-center h-64 rounded-lg border bg-card">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No transactions found matching your search."
              : "No transactions yet. Add your first transaction!"}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(transaction.transaction_type)}>
                      {transaction.transaction_type.charAt(0).toUpperCase() +
                        transaction.transaction_type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.item_name}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className="text-right">{transaction.quantity}</TableCell>
                  <TableCell className="text-right">
                    ₹{transaction.unit_price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{transaction.total_amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(transaction)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this transaction? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(transaction.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
