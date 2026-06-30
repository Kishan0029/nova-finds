-- Allow the Admin email to perform ALL operations on all tables

CREATE POLICY "Admins can do everything on orders" ON orders
  FOR ALL USING (auth.jwt() ->> 'email' = 'kishanrevankar002@gmail.com');

CREATE POLICY "Admins can do everything on order_items" ON order_items
  FOR ALL USING (auth.jwt() ->> 'email' = 'kishanrevankar002@gmail.com');

CREATE POLICY "Admins can do everything on products" ON products
  FOR ALL USING (auth.jwt() ->> 'email' = 'kishanrevankar002@gmail.com');
