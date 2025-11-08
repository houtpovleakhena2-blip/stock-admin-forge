import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/pages/Transactions";

const transactionSchema = z.object({
  transaction_type: z.enum(["purchase", "sale", "adjustment"]),
  item_name: z.string().min(2, "Item name is required"),
  category: z.string().min(2, "Category is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit_price: z.coerce.number().min(0, "Unit price must be positive"),
  supplier: z.string().optional(),
  customer: z.string().optional(),
  notes: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  transaction: Transaction | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const TransactionForm = ({ transaction, onSuccess, onCancel }: TransactionFormProps) => {
  const { toast } = useToast();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transaction_type: transaction?.transaction_type || "purchase",
      item_name: transaction?.item_name || "",
      category: transaction?.category || "",
      quantity: transaction?.quantity || 1,
      unit_price: transaction?.unit_price || 0,
      supplier: transaction?.supplier || "",
      customer: transaction?.customer || "",
      notes: transaction?.notes || "",
    },
  });

  const transactionType = form.watch("transaction_type");
  const quantity = form.watch("quantity");
  const unitPrice = form.watch("unit_price");

  const totalAmount = quantity * unitPrice;

  const onSubmit = async (values: TransactionFormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create transactions",
          variant: "destructive",
        });
        return;
      }

      const transactionData = {
        ...values,
        total_amount: totalAmount,
        created_by: user.id,
      };

      if (transaction) {
        const { error } = await supabase
          .from("transactions")
          .update(transactionData as any)
          .eq("id", transaction.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Transaction updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("transactions")
          .insert(transactionData as any);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Transaction added successfully",
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="transaction_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="item_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-medium">
            Total Amount: <span className="text-lg text-primary">₹{totalAmount.toFixed(2)}</span>
          </p>
        </div>

        {transactionType === "purchase" && (
          <FormField
            control={form.control}
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <FormControl>
                  <Input placeholder="Enter supplier name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {transactionType === "sale" && (
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {transaction ? "Update Transaction" : "Add Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
