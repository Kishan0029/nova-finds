"use client";

import { useState } from "react";
import { Search, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock Orders
const mockOrders = [
  { id: "ORD-7392", customer: "Rahul Sharma", email: "rahul.s@example.com", total: 24999, status: "Processing", date: "2026-06-30" },
  { id: "ORD-7391", customer: "Priya Patel", email: "priya.p@example.com", total: 5499, status: "Shipped", date: "2026-06-30" },
  { id: "ORD-7390", customer: "Amit Singh", email: "amit.s@example.com", total: 12899, status: "Delivered", date: "2026-06-29" },
  { id: "ORD-7389", customer: "Sneha Reddy", email: "sneha.r@example.com", total: 45000, status: "Processing", date: "2026-06-29" },
  { id: "ORD-7388", customer: "Karan Desai", email: "karan.d@example.com", total: 2999, status: "Cancelled", date: "2026-06-28" },
  { id: "ORD-7387", customer: "Anjali Gupta", email: "anjali.g@example.com", total: 8599, status: "Delivered", date: "2026-06-28" },
  { id: "ORD-7386", customer: "Vikram Malhotra", email: "vikram.m@example.com", total: 31999, status: "Shipped", date: "2026-06-27" },
];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  
  const filteredOrders = mockOrders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage customer orders and fulfillments.</p>
        </div>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.customer}</span>
                    <span className="text-xs text-muted-foreground">{order.email}</span>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>₹{order.total.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Badge variant={
                    order.status === "Delivered" ? "default" : 
                    order.status === "Shipped" ? "secondary" : 
                    order.status === "Processing" ? "outline" : "destructive"
                  }>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No orders found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
