-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  original_price numeric,
  rating numeric NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  category text NOT NULL,
  image text NOT NULL,
  is_new boolean DEFAULT false,
  discount_badge text,
  colors text[],
  stock integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read products (anonymous reading)
CREATE POLICY "Products are viewable by everyone."
  ON products FOR SELECT
  USING (true);

-- Create a categories table (optional for future expansion, but we can stick to string enum for now)
-- We'll just stick to the 'category' text field on products as requested.
