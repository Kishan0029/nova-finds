"use client";

import { useState } from "react";
import { Search, Mail, Ban, MoreHorizontal } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Customers
const mockCustomers = [
  { id: "CUS-001", name: "Rahul Sharma", email: "rahul.s@example.com", spent: 24999, orders: 1, status: "Active", joinDate: "2026-01-15" },
  { id: "CUS-002", name: "Priya Patel", email: "priya.p@example.com", spent: 55499, orders: 4, status: "Active", joinDate: "2025-11-02" },
  { id: "CUS-003", name: "Amit Singh", email: "amit.s@example.com", spent: 12899, orders: 1, status: "Inactive", joinDate: "2026-03-22" },
  { id: "CUS-004", name: "Sneha Reddy", email: "sneha.r@example.com", spent: 125000, orders: 8, status: "Active", joinDate: "2025-08-14" },
  { id: "CUS-005", name: "Karan Desai", email: "karan.d@example.com", spent: 2999, orders: 1, status: "Banned", joinDate: "2026-06-10" },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  
  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer accounts and activity.</p>
        </div>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
              <TableHead>Customer</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}`} />
                      <AvatarFallback>{customer.name.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-xs text-muted-foreground">{customer.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>₹{customer.spent.toLocaleString("en-IN")}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    customer.status === "Active" ? "default" : 
                    customer.status === "Inactive" ? "secondary" : "destructive"
                  }>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No customers found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
