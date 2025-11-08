-- Create enum for transaction types
CREATE TYPE public.transaction_type AS ENUM ('purchase', 'sale', 'adjustment');

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_type transaction_type NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  supplier TEXT,
  customer TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transactions
CREATE POLICY "Users can view all transactions"
  ON public.transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create transactions"
  ON public.transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Managers and admins can update transactions"
  ON public.transactions FOR UPDATE
  TO authenticated
  USING (public.is_manager_or_admin(auth.uid()));

CREATE POLICY "Managers and admins can delete transactions"
  ON public.transactions FOR DELETE
  TO authenticated
  USING (public.is_manager_or_admin(auth.uid()));

-- Create index for better query performance
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX idx_transactions_type ON public.transactions(transaction_type);
CREATE INDEX idx_transactions_created_by ON public.transactions(created_by);