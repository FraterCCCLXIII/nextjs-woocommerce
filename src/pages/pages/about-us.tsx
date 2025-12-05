import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout.component';

const AboutUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | Molecule</title>
        <meta
          name="description"
          content="Learn about Molecule - a USA-based supplier of high-purity peptides for advanced research and development."
        />
      </Head>
      <Layout title="About Us">
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              About Us
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Molecule is a USA-based supplier of high-purity peptides for advanced research and development. 
                We are committed to providing laboratory-grade products that meet the highest standards of quality 
                and purity for scientific research purposes.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our mission is to support the scientific research community by providing access to premium-quality 
                peptides and research compounds. We understand the critical importance of purity and reliability 
                in research applications, and we are dedicated to ensuring that every product we supply meets 
                rigorous quality standards.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                Quality Assurance
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Every batch of our peptides undergoes third-party testing by independent laboratories to verify 
                identity, purity, and composition. We publish full Certificates of Analysis (CoA) for each product, 
                providing transparency and confidence in the quality of our research materials.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                Research Focus
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                All products sold by Molecule are strictly intended for laboratory research use only. They are 
                not approved for human or animal consumption, or for any form of therapeutic or diagnostic use. 
                We do not provide usage instructions, dosing guidelines, or any advice regarding the application 
                of our products.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                Fast USA Shipping
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We ship directly from our U.S. facility, ensuring fast delivery times and eliminating customs 
                clearance delays. Our professional packaging and tracking updates ensure your research materials 
                arrive safely and on time.
              </p>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <p className="text-base text-gray-600">
                  <strong>Disclaimer:</strong> This is a research supply company only. All products are for 
                  laboratory research use only and are not intended for human or animal consumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutUs;

