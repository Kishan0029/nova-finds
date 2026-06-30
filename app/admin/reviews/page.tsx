"use client";

import { useState } from "react";
import { Star, Check, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Reviews
const mockReviews = [
  { id: "REV-001", customer: "Rahul Sharma", product: "Minimalist Smart Watch Pro", rating: 5, comment: "Absolutely love this watch. The build quality is exceptional and battery life is great.", status: "Pending", date: "Today" },
  { id: "REV-002", customer: "Priya Patel", product: "Ergonomic Desk Chair", rating: 4, comment: "Very comfortable for long hours. Assembly took a bit longer than expected though.", status: "Approved", date: "Yesterday" },
  { id: "REV-003", customer: "Karan Desai", product: "Noise-Cancelling Headphones", rating: 2, comment: "The sound quality is okay, but they are too tight on my head. Returning them.", status: "Approved", date: "3 days ago" },
  { id: "REV-004", customer: "Sneha Reddy", product: "Wireless Charging Pad", rating: 5, comment: "Sleek design, looks great on my nightstand. Charges fast.", status: "Pending", date: "4 days ago" },
];

export default function AdminReviewsPage() {
  const [search, setSearch] = useState("");
  
  const filteredReviews = mockReviews.filter(r => 
    r.customer.toLowerCase().includes(search.toLowerCase()) ||
    r.product.toLowerCase().includes(search.toLowerCase()) ||
    r.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Reviews</h1>
          <p className="text-muted-foreground mt-1">Moderate customer reviews and feedback.</p>
        </div>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 py-4 bg-muted/30 border-b border-border">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.customer}`} />
                <AvatarFallback>{review.customer.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{review.customer}</h3>
                <p className="text-xs text-muted-foreground">on {review.product} • {review.date}</p>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} 
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-foreground/90 leading-relaxed">"{review.comment}"</p>
              
              <div className="mt-6 flex gap-3 justify-end">
                {review.status === "Pending" ? (
                  <>
                    <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2">
                      <X className="h-4 w-4" /> Reject
                    </Button>
                    <Button className="gap-2">
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" disabled className="gap-2 bg-muted text-muted-foreground">
                    <Check className="h-4 w-4" /> Approved
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No reviews found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
