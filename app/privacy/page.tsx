import PolicyLayout from "@/components/shared/PolicyLayout";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Nova Finds",
  description: "Learn how Nova Finds collects, uses, shares, and protects your personal information and personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="July 1, 2026">
      <div className="space-y-8 text-foreground/95">
        
        {/* Section: Introduction */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">1. Introduction</h2>
          <p className="text-sm md:text-base leading-relaxed">
            This Privacy Policy describes how <strong className="font-semibold text-foreground">Nova Finds</strong> and its affiliates (collectively &quot;Nova Finds, we, our, us&quot;) collect, use, share, protect, or otherwise process your information/personal data through our website <Link href="https://novafinds.gonextverse.in/" className="text-primary hover:underline font-medium">https://novafinds.gonextverse.in/</Link> (hereinafter referred to as the &quot;Platform&quot;).
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India, and your personal data will primarily be stored and processed in India. 
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            By visiting this Platform, providing your information, or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use, and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree, please do not use or access our Platform.
          </p>
        </section>

        {/* Section: Collection */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">2. Collection of Personal Data</h2>
          <p className="text-sm md:text-base leading-relaxed">
            We collect your personal data when you use our Platform, services, or otherwise interact with us during the course of our relationship, and related information is provided from time to time. Some of the information that we may collect includes, but is not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base leading-relaxed">
            <li>
              Personal data/information provided during sign-up/registering or using our Platform such as your name, date of birth, billing/shipping address, telephone/mobile number, email ID, and any such information shared as proof of identity or address.
            </li>
            <li>
              Sensitive personal data collected with your consent, such as your bank account, credit/debit card, or other payment instrument details, or biometric details like facial features (in order to enable the use of specific features when opted for).
            </li>
            <li>
              Your behavior, preferences, and other transaction-related details that you choose to provide on our Platform, compiled on an aggregated basis for analysis.
            </li>
          </ul>
          <p className="text-sm md:text-base leading-relaxed">
            You always have the option to not provide information by choosing not to use a particular service or feature on the Platform. When third-party business partners collect your personal data directly from you, you will be governed by their respective privacy policies. We shall not be responsible for the third-party business partner&apos;s privacy practices or policies.
          </p>
          <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded-r-2xl text-sm text-destructive-foreground dark:text-red-400">
            <strong className="font-bold text-red-700 dark:text-red-300">Security Warning:</strong> If you receive an email or call from a person claiming to be representing Nova Finds seeking sensitive personal data like credit/debit card PIN, net-banking, or mobile banking passwords, please never provide such information. If you have already revealed such details, report it immediately to an appropriate law enforcement agency.
          </div>
        </section>

        {/* Section: Usage */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">3. Usage of Personal Data</h2>
          <p className="text-sm md:text-base leading-relaxed">
            We use your personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. Specifically, your data is used to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base leading-relaxed">
            <li>Assist sellers and business partners in handling and fulfilling orders, and processing shipments.</li>
            <li>Enhance the user experience and customize your interactions on our Platform.</li>
            <li>Resolve disputes, troubleshoot technical issues, and detect/protect against errors, fraud, or other criminal activities.</li>
            <li>Enforce our Terms of Use, and conduct market research, analysis, and surveys.</li>
            <li>Inform you about online/offline offers, product recommendations, services, and updates.</li>
          </ul>
        </section>

        {/* Section: Sharing */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">4. Sharing of Personal Data</h2>
          <p className="text-sm md:text-base leading-relaxed">
            We may share your personal data internally within our group entities, corporate affiliates, and business partners. These entities may market to you unless you explicitly opt-out. We may also disclose personal data to third parties such as:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base leading-relaxed">
            <li>Logistics and courier partners (e.g., Shiprocket) to handle order shipping and delivery.</li>
            <li>Prepaid payment instrument issuers and payment gateways (e.g., Razorpay) to facilitate secure payments.</li>
            <li>Law enforcement offices, government agencies, or authorized statutory bodies under legal obligations, or in the good faith belief that disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal processes.</li>
          </ul>
        </section>

        {/* Section: Security */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">5. Security Precautions</h2>
          <p className="text-sm md:text-base leading-relaxed">
            To protect your personal data from unauthorized access or disclosure, loss, or misuse, we adopt reasonable security practices and procedures. Once your information is in our possession, we adhere to strict security guidelines to protect it, utilizing secure servers where appropriate.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            However, the transmission of information over the internet is not completely secure for reasons beyond our control. Users accept the inherent security implications of data transmission over the internet and are responsible for ensuring the protection of login credentials and password records for their accounts.
          </p>
        </section>

        {/* Section: Retention */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">6. Data Deletion and Retention</h2>
          <p className="text-sm md:text-base leading-relaxed">
            You have an option to delete your account by visiting your profile and settings on our Platform, which results in losing all information related to your account. You can also write to us for assistance with these requests.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            In the event of pending grievances, claims, open shipments, or other active services, we may refuse or delay the deletion of the account. We retain your personal data for no longer than is required for the purpose for which it was collected or as required under applicable laws. We may continue to retain anonymized data for research and analysis purposes.
          </p>
        </section>

        {/* Section: Rights & Consent */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">7. Your Rights & Consent</h2>
          <p className="text-sm md:text-base leading-relaxed">
            You may access, rectify, and update your personal data directly through your profile settings on the Platform.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            By visiting our Platform or providing your information, you consent to the collection, use, storage, and processing of your details in accordance with this Privacy Policy. If you disclose personal data relating to other people, you represent that you have the authority to do so. You consent to us contacting you via SMS, instant messaging, email, or phone calls.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            You can withdraw your consent at any time by writing to our Grievance Officer with the subject line <strong className="font-semibold text-foreground">&quot;Withdrawal of consent for processing personal data&quot;</strong>. We reserve the right to restrict or deny services if the withdrawn information is necessary for service provision.
          </p>
        </section>

        {/* Section: Grievance Officer details */}
        <section className="bg-card border border-border p-6 rounded-2xl space-y-4">
          <h2 className="font-heading text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" /> Grievance Officer Contact Details
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            In accordance with the Information Technology Act, 2000 and rules made thereunder, the contact details of the Grievance Officer are provided below:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-muted-foreground block">Officer Name</span>
              <span className="font-semibold text-foreground">Grievance Officer</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-muted-foreground block">Designation</span>
              <span className="font-semibold text-foreground">Customer Support Lead</span>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground block">Company & Address</span>
              <span className="font-semibold text-foreground">
                Nova Finds, Shivam Plot No 9, New Shivaji Colony, Belgaum, Karnataka, India
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-muted-foreground block">Email Support</span>
              <Link href="mailto:support@novafinds.com" className="font-semibold text-primary hover:underline block">
                support@novafinds.com
              </Link>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-muted-foreground block">Phone & Availability</span>
              <span className="font-semibold text-foreground">+91 7349732341 (Mon - Fri, 9 AM - 6 PM)</span>
            </div>
          </div>
        </section>

      </div>
    </PolicyLayout>
  );
}
