import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout.component';

const TermsOfService: NextPage = () => {
  return (
    <Layout title="Terms of Service">
      <Head>
        <title>Terms of Service | Molecule</title>
        <meta
          name="description"
          content="Read the Terms of Service for Molecule - research peptides and compounds supplier."
        />
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                1. Acceptance of Terms
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                By accessing and using the Molecule website and purchasing
                products, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the
                above, please do not use this service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                2. Research Use Only
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                All products sold by Molecule are strictly intended for
                laboratory research use only. They are not approved for human or
                animal consumption, or for any form of therapeutic or diagnostic
                use. By purchasing our products, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed space-y-2">
                <li>
                  You are purchasing these products for research purposes only
                </li>
                <li>
                  You will not use these products for human or animal
                  consumption
                </li>
                <li>
                  You understand that these products are not drugs, supplements,
                  or food products
                </li>
                <li>
                  You will comply with all applicable federal, state, and local
                  regulations
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                3. No Medical or Usage Advice
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We do not provide usage instructions, dosing guidelines, or any
                advice regarding the application of our products. The buyer
                assumes all responsibility for the proper handling, storage, and
                use of purchased products.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                4. Order Acceptance and Payment
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                All orders are subject to acceptance by Molecule. We reserve the
                right to refuse or cancel any order for any reason, including
                but not limited to product availability, errors in pricing, or
                suspected fraudulent activity. Payment must be completed within
                48 hours of order placement. Unpaid orders will be automatically
                canceled.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                5. Return and Refund Policy
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                All sales are final. Due to the sensitive nature of research
                compounds and strict quality control requirements, we cannot
                accept returns or exchanges. If you have questions about your
                order, please contact our customer support team.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                6. Limitation of Liability
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Molecule shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from the
                use or inability to use our products. Our liability is limited to
                the purchase price of the product.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                7. Compliance with Laws
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The buyer is responsible for knowing and complying with all
                applicable federal, state, and local laws and regulations
                regarding the purchase, possession, and use of research
                peptides. Some compounds may be restricted in certain
                jurisdictions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                8. Changes to Terms
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Molecule reserves the right to modify these terms at any time.
                Your continued use of the website and services after any changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                9. Contact Information
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please
                contact us at{' '}
                <a
                  href="mailto:hello@molecule.com"
                  className="text-gray-900 font-medium hover:text-gray-700 underline"
                >
                  hello@molecule.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;

