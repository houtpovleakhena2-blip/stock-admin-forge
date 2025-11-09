import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StockItem } from "@/pages/Stock";
import { useToast } from "@/hooks/use-toast";

const stockFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Item name is required" })
    .max(100, { message: "Item name must be less than 100 characters" }),
  category: z
    .string()
    .min(1, { message: "Category is required" }),
  quantity: z
    .number()
    .int()
    .min(0, { message: "Quantity must be a positive number" })
    .max(999999, { message: "Quantity must be less than 1,000,000" }),
  unitPrice: z
    .number()
    .min(0, { message: "Unit price must be a positive number" })
    .max(9999999, { message: "Unit price must be less than 10,000,000" }),
  supplier: z
    .string()
    .trim()
    .min(1, { message: "Supplier name is required" })
    .max(100, { message: "Supplier name must be less than 100 characters" }),
  minStock: z
    .number()
    .int()
    .min(0, { message: "Minimum stock must be a positive number" })
    .max(99999, { message: "Minimum stock must be less than 100,000" }),
});

type StockFormValues = z.infer<typeof stockFormSchema>;

interface StockFormProps {
  onSubmit: (data: StockItem | Omit<StockItem, "id">) => void;
  initialData?: StockItem | null;
  onCancel: () => void;
}

const categories = [
  "Electronics",
  "Furniture",
  "Office Supplies",
  "Hardware",
  "Software",
  "Accessories",
];

const StockForm = ({ onSubmit, initialData, onCancel }: StockFormProps) => {
  const { toast } = useToast();

  const form = useForm<StockFormValues>({
    resolver: zodResolver(stockFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          category: initialData.category,
          quantity: initialData.quantity,
          unitPrice: initialData.unitPrice,
          supplier: initialData.supplier,
          minStock: initialData.minStock,
        }
      : {
          name: "",
          category: "",
          quantity: 0,
          unitPrice: 0,
          supplier: "",
          minStock: 0,
        },
  });

  const handleSubmit = (values: StockFormValues) => {
    if (initialData) {
      onSubmit({ ...values, id: initialData.id } as StockItem);
      toast({
        title: "Stock Updated",
        description: "Stock item has been updated successfully.",
      });
    } else {
      onSubmit(values as Omit<StockItem, "id">);
      toast({
        title: "Stock Added",
        description: "New stock item has been added successfully.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" {...field} />
              </FormControl>
              <FormDescription>The name of the stock item.</FormDescription>
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
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card z-50">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select the item category.</FormDescription>
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
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <FormControl>
                <Input placeholder="Enter supplier name" {...field} />
              </FormControl>
              <FormDescription>The supplier of this item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Stock Level</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>
                Alert threshold for low stock warning.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Item" : "Add Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StockForm;
