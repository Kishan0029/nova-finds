"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-light-background flex flex-col items-center justify-center py-20 px-4 sm:px-6">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-sm">
        
        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <h1 className="font-heading text-2xl font-bold mb-4">Check your email</h1>
            <p className="text-muted-foreground mb-8">
              We've sent password reset instructions to your email address.
            </p>
            <Button className="w-full h-14 rounded-xl text-lg font-semibold" render={<Link href="/login" />} nativeButton={false}>
              Return to Login
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground mb-2">Reset Password</h1>
              <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Email Address</label>
                <Input type="email" required placeholder="john@example.com" className="h-12 bg-background" />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 rounded-xl text-lg font-semibold shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
