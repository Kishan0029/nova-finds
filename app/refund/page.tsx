import PolicyLayout from "@/components/shared/PolicyLayout";
import Link from "next/link";
import { Clock, HelpCircle, CheckCircle2, XCircle } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy | Nova Finds",
  description: "Learn about cancellation windows, refund timelines, and defective item replacements at Nova Finds.",
};

export default function RefundPage() {
  return (
    <PolicyLayout title="Refund & Cancellation Policy" lastUpdated="July 1, 2026">
      <div className="space-y-8 text-foreground/95">
        
        <p className="lead text-base md:text-lg text-muted-foreground leading-relaxed">
          This Refund and Cancellation Policy outlines the guidelines, windows, and procedures for canceling orders or seeking a refund/exchange for products purchased through the Nova Finds platform.
        </p>

        {/* Highlight Cards specific to Refunds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-2">
            <h3 className="font-heading font-bold text-foreground text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Cancellation Window
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Order cancellations can be requested within <strong className="font-semibold text-foreground">7 days</strong> of order placement, provided the shipment has not yet left the seller&apos;s warehouse.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-2">
            <h3 className="font-heading font-bold text-foreground text-base flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Refund Processing
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Once a refund request is approved by Nova Finds, the amount will be processed and returned to your original payment method within <strong className="font-semibold text-foreground">3 business days</strong>.
            </p>
          </div>
        </div>

        {/* Section: Cancellation Policy */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">1. Order Cancellations</h2>
          <p className="text-sm md:text-base leading-relaxed">
            We understand that plans can change. You can request to cancel your order by observing the following guidelines:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              Cancellations will only be considered if the request is made <strong className="font-semibold text-foreground">within 7 days of placing the order</strong>.
            </li>
            <li>
              Cancellation requests will not be entertained if the orders have been communicated to our merchants/sellers and they have already initiated the shipping process, or the product is out for delivery.
            </li>
            <li>
              In events where the shipment is already in transit and cannot be canceled, you may choose to **reject the product at your doorstep** when the courier attempts delivery.
            </li>
            <li>
              <strong className="font-semibold text-foreground">Perishable Items:</strong> Nova Finds does not accept cancellation requests for perishable items (such as flowers, eatables, fresh products, etc.). However, a refund or replacement can be issued if you establish that the quality of the product delivered is compromised.
            </li>
          </ul>
        </section>

        {/* Section: Damaged or Defective Items */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">2. Damaged, Defective, or Incorrect Items</h2>
          <p className="text-sm md:text-base leading-relaxed">
            If your order arrives damaged or defective, or if you feel that the product received is not as shown on our site, please report it immediately:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              All damaged or defective items must be reported to our customer service team <strong className="font-semibold text-foreground">within 7 days of receipt of products</strong>.
            </li>
            <li>
              The request will be processed and entertained once the merchant/seller listed on the Platform has checked and verified the defect or damage at their own end.
            </li>
            <li>
              If you feel the product received does not meet your expectations or does not match the specifications shown on the website, you must report it within <strong className="font-semibold text-foreground">7 days of delivery</strong>. Our support team will look into your complaint and make an appropriate decision regarding refund/exchange eligibility.
            </li>
          </ul>
        </section>

        {/* Section: Manufacturer Warranty */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">3. Products with Manufacturer Warranty</h2>
          <p className="text-sm md:text-base leading-relaxed">
            In case of complaints regarding products that come with a direct brand/manufacturer warranty, please refer the issue directly to the manufacturer for service, repair, or replacement as per their warranty terms. Nova Finds is happy to assist you with the manufacturer&apos;s contact details if needed.
          </p>
        </section>

        {/* Section: Refund Timelines */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">4. Refund Issuance and Processing</h2>
          <p className="text-sm md:text-base leading-relaxed">
            Once a cancellation or return is approved by the Nova Finds inspection team:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base leading-relaxed">
            <li>Approved refunds are initiated instantly.</li>
            <li>It will take up to <strong className="font-semibold text-foreground">3 business days</strong> for the refund to reflect in your original payment account (bank account, credit/debit card, or UPI wallet).</li>
            <li>Shipping costs levied at the time of purchase (if any) are non-refundable.</li>
          </ul>
        </section>

        {/* FAQ Support Box */}
        <section className="bg-muted border border-border p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-foreground flex items-center gap-1.5">
              <HelpCircle className="h-5 w-5 text-primary" /> Questions about Refunds?
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reach out to our support team and we will get back to you with updates on your request status.
            </p>
          </div>
          <Link href="/contact" className="inline-block bg-primary text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-xl shadow hover:shadow-md transition-shadow shrink-0">
            Contact Support
          </Link>
        </section>

      </div>
    </PolicyLayout>
  );
}
