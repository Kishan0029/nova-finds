"use client";

import { Package, User, MapPin, CreditCard, LogOut, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AccountDashboardPage() {
  const mockOrders = [
    { id: "ORD-7392", date: "June 30, 2026", total: "₹24,999", status: "Processing", items: 2 },
    { id: "ORD-7390", date: "June 25, 2026", total: "₹12,899", status: "Delivered", items: 1 },
    { id: "ORD-7201", date: "May 14, 2026", total: "₹5,499", status: "Delivered", items: 3 },
  ];

  return (
    <div className="min-h-screen bg-light-background py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-heading font-bold shadow-md">
              JD
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">John Doe</h1>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <Badge variant="secondary" className="mt-2">Premium Member</Badge>
            </div>
          </div>
          <Button variant="outline" className="gap-2 rounded-full">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full justify-start h-auto bg-transparent border-b border-border rounded-none p-0 overflow-x-auto flex-nowrap mb-8">
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap gap-2"
            >
              <Package className="h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap gap-2"
            >
              <User className="h-4 w-4" /> Profile Info
            </TabsTrigger>
            <TabsTrigger 
              value="addresses" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap gap-2"
            >
              <MapPin className="h-4 w-4" /> Addresses
            </TabsTrigger>
            <TabsTrigger 
              value="payment" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap gap-2"
            >
              <CreditCard className="h-4 w-4" /> Payment Methods
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-6">
            {mockOrders.map(order => (
              <Card key={order.id} className="border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 bg-muted/30 border-b border-border">
                  <div>
                    <CardTitle className="text-base font-semibold">Order {order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.total}</p>
                    <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className="mt-1">
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{order.items} {order.items === 1 ? 'item' : 'items'} in this order</p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">Track Package</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">First Name</p>
                    <p className="font-medium">John</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Name</p>
                    <p className="font-medium">Doe</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <Button className="mt-4">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your shipping addresses.</CardDescription>
                </div>
                <Button variant="outline" size="sm">Add New</Button>
              </CardHeader>
              <CardContent>
                <div className="border border-primary rounded-xl p-4 bg-primary/5 relative">
                  <Badge className="absolute top-4 right-4">Default</Badge>
                  <h3 className="font-bold mb-1">Home</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    John Doe<br/>
                    123 Marine Drive, Apartment 4B<br/>
                    Mumbai, Maharashtra 400020<br/>
                    India
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="h-8">Edit</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved cards and payment methods.</CardDescription>
                </div>
                <Button variant="outline" size="sm">Add New</Button>
              </CardHeader>
              <CardContent>
                <div className="border border-border rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-14 bg-muted rounded flex items-center justify-center font-bold text-xs border border-border">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/28</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Remove</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
}
