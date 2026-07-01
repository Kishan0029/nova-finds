import PolicyLayout from "@/components/shared/PolicyLayout";
import Link from "next/link";
import { CheckCircle2, ShieldAlert, BadgeInfo } from "lucide-react";

export const metadata = {
  title: "Return & Exchange Policy | Nova Finds",
  description: "Read about our 7-day return policy, exchange criteria, product exemptions, and inspection process at Nova Finds.",
};

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout title="Return Policy" lastUpdated="July 1, 2026">
      <div className="space-y-8 text-foreground/95">
        
        <p className="lead text-base md:text-lg text-muted-foreground leading-relaxed">
          At Nova Finds, customer satisfaction is our top priority. We offer a simple refund and exchange policy during the first <strong className="font-semibold text-foreground">7 days</strong> from the date of your purchase. 
        </p>

        {/* Section: Eligibility */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" /> Return Eligibility Criteria
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            To qualify for a return or exchange, please ensure that your item meets all of the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              The request must be initiated within <strong className="font-semibold text-foreground">7 days from the delivery date</strong>. If 7 days have passed since delivery, we unfortunately cannot offer you a return, exchange, or refund of any kind.
            </li>
            <li>
              The purchased item must be <strong className="font-semibold text-foreground">unused</strong> and in the same pristine condition that you received it.
            </li>
            <li>
              The item must be in its <strong className="font-semibold text-foreground">original packaging</strong> (including boxes, manuals, and accessories).
            </li>
            <li>
              Items purchased during specific sale events or under clear promotional discounts may be marked as non-returnable and non-exchangeable.
            </li>
          </ul>
        </section>

        {/* Section: Exchanges */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">Exchanges</h2>
          <p className="text-sm md:text-base leading-relaxed">
            We only replace items if they are found to be <strong className="font-semibold text-foreground">defective or damaged</strong> when delivered. If you need to exchange an item for the same product, please contact our support team at <Link href="mailto:support@novafinds.com" className="text-primary hover:underline">support@novafinds.com</Link> to initiate the exchange process.
          </p>
        </section>

        {/* Section: Exemptions */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" /> Exempted Items & Categories
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            Please note that certain types of products are exempt from being returned or refunded:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base leading-relaxed">
            <li>Perishable goods (such as food, flowers, or plants).</li>
            <li>Personal care, hygiene, or beauty products.</li>
            <li>Customized, bespoke, or personalized orders.</li>
            <li>Gift cards or downloadable software.</li>
          </ul>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            Any exemptions will be clearly indicated to you on the product details page or at the time of purchase.
          </p>
        </section>

        {/* Section: Inspection Process */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <BadgeInfo className="h-6 w-6 text-primary" /> Return Inspection & Verification
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            Once your returned item is received at our facility and undergoes inspection:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              We will send you an email notification confirming receipt of your returned package.
            </li>
            <li>
              Our quality check team will inspect the item to verify its condition (unused, original tags, undamaged).
            </li>
            <li>
              We will notify you of the approval or rejection of your return/exchange request.
            </li>
            <li>
              If approved, your return or exchange request will be processed immediately, and refunds will be initiated to your original payment method in accordance with our <Link href="/refund" className="text-primary hover:underline font-semibold">Refund Policy</Link>.
            </li>
          </ul>
        </section>

      </div>
    </PolicyLayout>
  );
}
