import PolicyLayout from "@/components/shared/PolicyLayout";
import Link from "next/link";
import { Truck, Info, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Shipping Policy | Nova Finds",
  description: "Learn about our order dispatch timelines, shipping carriers, tracking processes, and shipping cost policies.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="July 1, 2026">
      <div className="space-y-8 text-foreground/95">
        
        <p className="lead text-base md:text-lg text-muted-foreground leading-relaxed">
          At Nova Finds, we partner with reliable logistics providers to ensure your orders are packaged, shipped, and delivered to you safely and efficiently.
        </p>

        {/* Highlight Cards specific to Shipping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-2">
            <h3 className="font-heading font-bold text-foreground text-base flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> Dispatch Timeline
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Orders are packaged and dispatched from our fulfillment centers within <strong className="font-semibold text-foreground">5 business days</strong> of payment confirmation.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-2">
            <h3 className="font-heading font-bold text-foreground text-base flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Delivery Coverage
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We ship to all serviceable postal codes across India using registered domestic courier companies and speed post services.
            </p>
          </div>
        </div>

        {/* Section: Delivery Partners & Carriers */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">1. Carrier and Delivery Partners</h2>
          <p className="text-sm md:text-base leading-relaxed">
            All user orders are dispatched using registered domestic courier companies (such as Shiprocket, Delhivery, etc.) and/or Speed Post services. This ensures that you receive tracking updates and professional service throughout the transit phase.
          </p>
        </section>

        {/* Section: Shipping and Delivery Timelines */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">2. Timelines and Handling</h2>
          <p className="text-sm md:text-base leading-relaxed">
            Please note the following timelines and terms regarding your order dispatch:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              Orders are processed and shipped within <strong className="font-semibold text-foreground">5 days</strong> from the date of the order and/or payment confirmation.
            </li>
            <li>
              Alternatively, shipments will be dispatched in accordance with the specific delivery date agreed upon at the time of order confirmation.
            </li>
            <li>
              Actual transit time is subject to courier company rules, post office norms, local regulations, and destination accessibility.
            </li>
            <li>
              <strong className="font-semibold text-foreground">Liability Limitation:</strong> The Platform Owner (Nova Finds) shall not be liable for any delay in delivery by the logistics partner, courier company, or postal authority. However, our customer service team will actively assist you in tracking and escalating delays to speed up delivery.
            </li>
          </ul>
        </section>

        {/* Section: Delivery Address Verification */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">3. Delivery Addresses</h2>
          <p className="text-sm md:text-base leading-relaxed">
            Delivery of all orders will be made directly to the shipping address provided by the buyer at the time of purchase. Please ensure that you provide complete, accurate addresses including postal PIN codes and landmark details to avoid delivery failures or courier returns.
          </p>
        </section>

        {/* Section: Shipping Confirmations */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" /> Delivery and Shipment Confirmation
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            Delivery notifications, updates, and tracking link details will be automatically confirmed on your registered email ID and/or mobile number specified at the time of order placement.
          </p>
        </section>

        {/* Section: Refundability of Shipping Cost */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">4. Shipping Charges Refund Policy</h2>
          <p className="text-sm md:text-base leading-relaxed">
            Any shipping or convenience charges levied at the time of purchase by the seller or Nova Finds (as the case may be) are **non-refundable** under return or refund requests.
          </p>
        </section>

        {/* Note Box */}
        <div className="bg-muted border-l-4 border-primary p-4 rounded-r-2xl flex gap-3 my-6">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-foreground/90">
            <p className="font-semibold">Tracking an existing order?</p>
            <p className="text-muted-foreground leading-relaxed">
              If your order is already shipped, you can track it live on our platform. Use your order ID in the tracking section.
            </p>
            <Link href="/track-order" className="inline-block text-primary hover:underline font-semibold mt-1">
              Go to Order Tracking Page &rarr;
            </Link>
          </div>
        </div>

      </div>
    </PolicyLayout>
  );
}
