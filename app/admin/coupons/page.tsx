"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Edit } from "lucide-react";
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

// Mock Coupons
const mockCoupons = [
  { id: "CPN-001", code: "WELCOME10", discount: "10%", type: "Percentage", uses: 145, limit: "∞", status: "Active", expires: "2026-12-31" },
  { id: "CPN-002", code: "SUMMER500", discount: "₹500", type: "Fixed Amount", uses: 82, limit: 100, status: "Active", expires: "2026-08-31" },
  { id: "CPN-003", code: "FREESHIP", discount: "Free Shipping", type: "Shipping", uses: 340, limit: "∞", status: "Active", expires: "2027-01-01" },
  { id: "CPN-004", code: "WINTER20", discount: "20%", type: "Percentage", uses: 50, limit: 50, status: "Expired", expires: "2026-02-28" },
];

export default function AdminCouponsPage() {
  const [search, setSearch] = useState("");
  
  const filteredCoupons = mockCoupons.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Coupons</h1>
          <p className="text-muted-foreground mt-1">Manage discount codes and promotions.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coupons..."
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
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-mono font-bold text-primary">{coupon.code}</TableCell>
                <TableCell className="font-medium">{coupon.discount}</TableCell>
                <TableCell>{coupon.type}</TableCell>
                <TableCell>{coupon.uses} / {coupon.limit}</TableCell>
                <TableCell>{new Date(coupon.expires).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    coupon.status === "Active" ? "default" : "destructive"
                  }>
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredCoupons.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No coupons found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
