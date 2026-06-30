import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const SITE_URL = 'https://emifree.com';

export default function Terms() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const pageUrl = `${SITE_URL}/terms`;
    const title = 'General Terms and Conditions (GTC) · Emifree GmbH';
    const description =
      'Emifree GmbH General Terms and Conditions (GTC) for B2B sales of industrial air filtration systems. Applicable law: Federal Republic of Germany. Exclusive jurisdiction: Berlin.';

    document.title = title;

    const setMeta = (selector, attr, attrValue, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (attr === 'name') tag.name = attrValue;
        else tag.setAttribute('property', attrValue);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    const oldScript = document.getElementById('emifree-terms-schema');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'emifree-terms-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'General Terms and Conditions',
      url: pageUrl,
      inLanguage: 'en',
      description,
      publisher: {
        '@type': 'Organization',
        name: 'Emifree GmbH',
        url: SITE_URL,
      },
    });
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('emifree-terms-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>

          <nav aria-label="breadcrumb" className="mb-6 text-sm text-zinc-500">
            <Link to="/" className="hover:text-blue-700">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-zinc-700">General Terms and Conditions</span>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            General Terms and Conditions (GTC)
          </motion.h1>

          <p className="text-zinc-600 mt-4 text-base leading-relaxed">
            <strong>Emifree GmbH Produktion von Filteranlagen</strong>
            <br />
            Pestalozzistraße 13, 12557 Berlin, Germany
            <br />
            Phone: <a href="tel:+493076283520" className="text-blue-700 hover:text-blue-800">+49 3076283520</a>
            {' · '}
            E-Mail: <a href="mailto:info@emifree.com" className="text-blue-700 hover:text-blue-800">info@emifree.com</a>
          </p>
        </div>
      </div>

      <motion.article
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* § 1 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-2 mb-4">
          § 1 Scope &amp; B2B Exclusivity
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          (1) These General Terms and Conditions (GTC) apply exclusively to all
          business relations, deliveries, and offers between Emifree GmbH (hereinafter
          "Seller") and the customer in the version valid at the time of the order.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (2) The Seller's catalog and web presence are directed exclusively at
          commercial entities, traders, and entrepreneurs within the meaning of § 14 BGB
          (German Civil Code), § 1 Paragraph 2 HGB (German Commercial Code), and
          § 15 II EStG (German Income Tax Act). Sales and purchase contracts involving
          private consumers (§ 13 BGB) are strictly excluded. By submitting an order,
          the customer guarantees that they are acting as a commercial entity.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          (3) Deviating, conflicting, or supplementary terms and conditions of the
          customer shall not become part of the contract unless the Seller has explicitly
          agreed to their validity in writing.
        </p>

        {/* § 2 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 2 Formation of Contract
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          (1) The presentation of products on the website does not constitute a legally
          binding offer, but rather a non-binding online catalog.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (2) By submitting an order request via the website, the customer issues a
          binding contractual offer within the meaning of § 145 BGB.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (3) The contract is concluded only when the Seller issues an explicit
          written order confirmation / acceptance via email (or via postal mail upon
          request). The customer waives the right to formal receipt of an acceptance
          declaration pursuant to § 151 Sentence 1 BGB.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (4) For advance payments (Vorkasse), the contract is concluded at the time of
          the payment request or upon successful transaction by the customer. If payment
          is not completed within 10 days of sending the request, the Seller is no
          longer bound by the transaction request.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          (5) If the published specification of the goods does not align with the
          customer's request, the customer will be notified of potential discrepancies
          and a corresponding counter-offer will be extended.
        </p>

        {/* § 3 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 3 Delivery, Shipping Costs, Transfer of Risk &amp; Inspection Obligations
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          (1) Delivery periods shall be deemed approximate only. Even if a calendar
          delivery date is specified, it does not constitute a fixed-date commercial
          transaction (<em>Fixhandelsgeschäft</em>) under § 376 Paragraph 1 HGB, unless
          explicitly agreed upon in writing.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (2) If freights, charges, duties, taxes, or fees are introduced or increased
          after contract conclusion, the Seller is authorized to adjust the purchase
          price accordingly. Prices valid on the day of actual delivery shall apply.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (3) The buyer must note any visible damage or shortages on the delivery note
          immediately upon arrival and obtain written acknowledgment from the carrier.
          Unacknowledged damages or shortages will not be recognized by the Seller or
          insurers.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          (4) The customer must notify the Seller in writing of patent defects
          immediately upon receipt of the goods at their destination, and of latent
          defects immediately upon discovery, providing a detailed description. Any
          other defect notifications must be sent via registered mail within a maximum of
          10 days following receipt.
        </p>

        {/* § 4 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 4 Warranties &amp; Defects Management
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          (1) In the case of justified and timely defect notifications, the Seller
          shall, at its discretion, remedy the defect within a reasonable timeframe
          (generally within 4 weeks), deliver a flawless replacement item, or grant an
          appropriate price reduction.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (2) If the Seller fails to fulfill these obligations within a reasonable grace
          period, the customer may demand a price reduction, rescind the contract, or
          carry out the repair independently or via a third party at the Seller's
          expense.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (3) If the transaction constitutes a commercial purchase for both parties,
          the statutory inspection and notification requirements of §§ 377 HGB shall
          apply. If the subject matter of the contract is second-hand or used
          machinery / goods, any warranty for material defects is strictly excluded.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (4) No warranty or liability is assumed for material defects resulting from
          unsuitable or improper use, incorrect assembly or commissioning by the
          customer or third parties, normal wear and tear, or negligent handling.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          (5) The return of defect-free goods is generally excluded and requires
          express written approval from the Seller. Returns are strictly limited to 8
          business days post-delivery; older items will be returned to the customer at
          their expense.
        </p>

        {/* § 5 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 5 Retention of Title
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          (1) All delivered goods remain the property of the Seller until full
          settlement of all outstanding claims arising from the ongoing business
          relationship, including future or conditional claims.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (2) The buyer is authorized to resell or process the retained goods in the
          ordinary course of business. The buyer hereby assigns to the Seller all
          claims up to the invoice value arising from reselling the goods to third
          parties. The Seller accepts this assignment.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (3) The buyer remains authorized to collect the claim alongside the Seller.
          The Seller may revoke this collection authorization if the buyer falls into
          arrears or if their creditworthiness is materially diminished.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          (4) If third parties seize or attach the retained goods, the buyer must
          report the Seller's ownership stake and immediately notify the Seller. The
          buyer shall bear all intervention costs.
        </p>

        {/* § 6 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 6 Limitation of Liability &amp; Statute of Limitations
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          (1) The Seller shall be liable without limitation for intent, gross
          negligence, and for culpable injury to life, body, or health.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (2) In cases of ordinary negligent breaches of essential contractual
          obligations (<em>Kardinalpflichten</em>), the Seller's liability shall be
          limited to typical, reasonably foreseeable contractual damages. Liability for
          loss of profit or other consequential financial damages of the customer is
          excluded in these cases.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (3) Any further liability of the Seller, regardless of the legal framework,
          is excluded to the extent permitted by law.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          (4) All claims of the customer — on whatever legal grounds — shall expire 12
          months from delivery or formal acceptance of the goods. This does not apply
          to mandatory statutory limitations or damages resulting from intent or gross
          negligence.
        </p>

        {/* § 7 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 7 Confidentiality
        </h2>
        <p className="text-lg leading-relaxed mb-8">
          The customer is obliged to treat all information, know-how, and commercial
          trade secrets disclosed in connection with the performance of the order
          strictly confidential, and shall not pass on drawings, documentation, or other
          materials to third parties without the prior written consent of Emifree GmbH.
        </p>

        {/* § 8 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 8 Data Protection Note
        </h2>
        <p className="text-lg leading-relaxed mb-8">
          Information concerning the collection, storage, and processing of personal
          data does not form part of these commercial terms and conditions and is
          governed exclusively and separately by the Seller's designated{' '}
          <Link to="/privacy" className="text-blue-700 hover:text-blue-800 underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* § 9 */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          § 9 Governing Law, Jurisdiction &amp; Severability
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          (1) The contractual relationship between the Seller and the customer shall be
          governed exclusively by the laws of the Federal Republic of Germany. The
          application of the UN Convention on Contracts for the International Sale of
          Goods (CISG) is explicitly excluded.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          (2) The exclusive place of jurisdiction for all disputes arising out of or in
          connection with this contract is the registered corporate seat of the Seller
          in <strong>Berlin</strong>, provided that the customer is a merchant within
          the meaning of the HGB, a legal entity under public law, or a special fund
          under public law. However, the Seller remains entitled to file a suit at the
          customer's primary place of business.
        </p>
        <p className="text-lg leading-relaxed mb-10">
          (3) Should individual provisions of these terms be or become invalid, the
          validity of the remaining provisions shall remain unaffected. The invalid
          provision shall be replaced by a valid clause that comes closest to the
          economic intent of the original text.
        </p>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </motion.article>
    </div>
  );
}