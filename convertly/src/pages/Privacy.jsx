import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const SITE_URL = 'https://emifree.com';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const pageUrl = `${SITE_URL}/privacy`;
    const title = 'Privacy Policy · Emifree GmbH';
    const description =
      'Privacy policy for the Emifree GmbH website — GDPR-compliant notice on data collection, processing, your rights, and the cookies/plugins we use.';

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

    const oldScript = document.getElementById('emifree-privacy-schema');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'emifree-privacy-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy',
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
      const s = document.getElementById('emifree-privacy-schema');
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
            <span className="text-zinc-700">Privacy Policy</span>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Privacy Policy
          </motion.h1>
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
        {/* 1. Privacy at a Glance */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-2 mb-4">
          1. Privacy at a Glance
        </h2>

        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
          General Information
        </h3>
        <p className="text-lg leading-relaxed mb-6">
          The following notes provide a simple overview of what happens to your personal
          data when you visit this website. Personal data is any data with which you can
          be personally identified.
        </p>

        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
          Data Collection on Our Website
        </h3>
        <ul className="text-lg leading-relaxed mb-6 space-y-3 list-disc pl-6">
          <li>
            <strong>Who is responsible for data collection on this website?</strong>{' '}
            The data processing on this website is carried out by the website operator:
            Emifree GmbH Produktion von Filteranlagen, Pestalozzistraße 13, 12557 Berlin,
            Germany. Email:{' '}
            <a href="mailto:info@emifree.com" className="text-blue-700 hover:text-blue-800">
              info@emifree.com
            </a>
            .
          </li>
          <li>
            <strong>How do we collect your data?</strong> On one hand, your data is
            collected when you provide it to us (e.g., by entering it into a contact
            form, live chat, or newsletter registration). Other data is collected
            automatically or based on your consent when you visit the website via our
            IT systems (e.g., IP address, browser type, time of page view).
          </li>
          <li>
            <strong>What do we use your data for?</strong> Part of the data is collected
            to ensure the error-free provision of the website. Other data can be used to
            analyze user behavior or provide customer support channels (such as live chat).
          </li>
        </ul>

        {/* 2. General Notes and Mandatory Information */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4">
          2. General Notes and Mandatory Information
        </h2>

        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
          Legal Basis for Processing
        </h3>
        <p className="text-lg leading-relaxed mb-4">
          We process personal data in accordance with the GDPR (General Data Protection
          Regulation) and the German TDDDG:
        </p>
        <ul className="text-lg leading-relaxed mb-6 space-y-3 list-disc pl-6">
          <li>
            <strong>Consent (Art. 6 (1)(a) GDPR):</strong> For specific purposes (e.g.,
            tracking cookies, newsletter subscription, live chat functionality), we only
            process data after obtaining your explicit consent.
          </li>
          <li>
            <strong>Performance of a Contract or Pre-contractual Measures (Art. 6 (1)(b)
            GDPR):</strong> If processing is necessary for the performance of a contract
            to which you are a party or to take steps at your request prior to entering
            into a contract (B2B inquiries).
          </li>
          <li>
            <strong>Legal Obligation (Art. 6 (1)(c) GDPR):</strong> If we are subject to a
            legal obligation (e.g., documenting cookie consent choices).
          </li>
          <li>
            <strong>Legitimate Interests (Art. 6 (1)(f) GDPR):</strong> To safeguard our
            legitimate business interests (e.g., maintaining technical stability of the
            website, IT security).
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
          Your Rights as a Data Subject
        </h3>
        <p className="text-lg leading-relaxed mb-4">
          Under applicable statutory provisions, you have the following rights regarding
          your personal data at any time:
        </p>
        <ul className="text-lg leading-relaxed mb-6 space-y-3 list-disc pl-6">
          <li>
            <strong>Access (Art. 15 GDPR):</strong> You have the right to obtain
            information about the origin, recipient, and purpose of your stored personal
            data free of charge.
          </li>
          <li>
            <strong>Rectification (Art. 16 GDPR) or Erasure (Art. 17 GDPR):</strong> You
            may request the correction of incorrect data or the erasure of your data.
          </li>
          <li>
            <strong>Restriction of Processing (Art. 18 GDPR):</strong> You have the
            right to request the restriction of the processing of your data.
          </li>
          <li>
            <strong>Data Portability (Art. 20 GDPR):</strong> You can request that we
            hand over your data to you or a third party in a standard, machine-readable
            format.
          </li>
          <li>
            <strong>Withdrawal of Consent (Art. 7 (3) GDPR):</strong> Many data
            processing operations are only possible with your express consent. You can
            withdraw consent you have already given at any time with future effect.
          </li>
          <li>
            <strong>Right to Lodge a Complaint (Art. 77 GDPR):</strong> In the event of
            data protection violations, you have the right to lodge a complaint with a
            competent data protection supervisory authority.
          </li>
        </ul>

        {/* 3. Consent Management and Plugins */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4">
          3. Consent Management and Plugins
        </h2>

        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Cookiebot</h3>
        <p className="text-lg leading-relaxed mb-6">
          We use the consent management tool "Cookiebot" operated by Usercentrics A/S
          (Havnegade 39, 1058 Copenhagen, Denmark).
        </p>
        <ul className="text-lg leading-relaxed mb-6 space-y-3 list-disc pl-6">
          <li>
            <strong>Purpose:</strong> Cookiebot is used to obtain your consent for
            storing certain cookies on your terminal device and to document this in
            accordance with data protection regulations.
          </li>
          <li>
            <strong>Legal Basis:</strong> Processing is carried out to fulfill a legal
            obligation pursuant to Art. 6 (1)(c) GDPR in conjunction with § 25 (1) TDDDG.
          </li>
          <li>
            <strong>Data Stored:</strong> When you enter our website, a Cookiebot cookie
            ("CookieConsent") is stored in your browser, recording your preferences or
            withdrawal of consent. This data is retained until you delete the cookie or
            the purpose for data storage no longer applies.
          </li>
        </ul>


        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">
          Tawk.to (Live Chat)
        </h3>
        <p className="text-lg leading-relaxed mb-6">
          We use live chat software provided by tawk.to inc. (101 Hunter Avenue, Suite
          102, Cary, NC 27511, USA).
        </p>
        <ul className="text-lg leading-relaxed mb-6 space-y-3 list-disc pl-6">
          <li>
            <strong>Purpose:</strong> The live chat enables fast, direct communication
            with our B2B clients and prospects.
          </li>
          <li>
            <strong>Legal Basis:</strong> Tawk.to is utilized exclusively on the basis of
            your explicit consent pursuant to Art. 6 (1)(a) GDPR. The chat widget will
            not load, and no data will be transferred until you grant permission via the
            Cookiebot banner.
          </li>
          <li>
            <strong>Data Processed:</strong> Utilizing the chat processes technical
            infrastructure details (IP address, browser type, operating system,
            geographic region, visit duration) as well as any chat contents entered
            by you (e.g., name, email address, messages).
          </li>
          <li>
            <strong>Third-Country Transfer:</strong> Data is transferred to tawk.to
            servers in the USA. Because tawk.to processes data outside the EU, Standard
            Contractual Clauses (SCCs) have been implemented to guarantee an appropriate
            level of data protection.
          </li>
          <li>
            <strong>Withdrawal:</strong> You can adjust or withdraw your consent at any
            time via the Cookiebot settings link on our website.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Google Analytics</h3>
        <p className="text-lg leading-relaxed mb-6">
          We use Google Analytics, a web analytics service provided by Google Ireland
          Limited (Gordon House, Barrow Street, Dublin 4, Ireland).
        </p>
        <ul className="text-lg leading-relaxed mb-6 space-y-3 list-disc pl-6">
          <li>
            <strong>Purpose:</strong> Analyzing website usage to design and optimize
            our B2B online presence.
          </li>
          <li>
            <strong>Legal Basis:</strong> Usage takes place exclusively after your
            explicit consent via Art. 6 (1)(a) GDPR and § 25 (1) TDDDG.
          </li>
          <li>
            <strong>IP Anonymization:</strong> We utilize Google Analytics strictly with
            activated IP anonymization (IP masking), meaning your IP address is
            truncated by Google within EU member states before transmission.
          </li>
          <li>
            <strong>Data Transfer:</strong> The IP address transmitted by your browser
            within the framework of Google Analytics will not be merged with other
            Google data. Data may be transferred to Google LLC in the USA (certified
            under the EU-US Data Privacy Framework).
          </li>
        </ul>

        {/* 4. Newsletters and Contact Forms */}
        <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4">
          4. Newsletters and Contact Forms
        </h2>

        <h3 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Newsletter Data</h3>
        <p className="text-lg leading-relaxed mb-6">
          If you wish to receive the newsletter offered on the website, we require an
          email address from you as well as information that allows us to verify that
          you are the owner of the specified email address.
        </p>
        <ul className="text-lg leading-relaxed mb-6 space-y-3 list-disc pl-6">
          <li>
            <strong>Tracking:</strong> By registering, you agree that we may analyze
            your clicking behavior on links within the newsletter in an anonymized /
            pseudononymized form to perfectly tailor content to our commercial client
            base.
          </li>
          <li>
            <strong>Legal Basis:</strong> Art. 6 (1)(a) GDPR (Consent).
          </li>
          <li>
            <strong>Withdrawal:</strong> You can withdraw your consent to the storage of
            data, the email address, and its use for sending the newsletter at any time
            via the "unsubscribe" link in the newsletter.
          </li>
        </ul>

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