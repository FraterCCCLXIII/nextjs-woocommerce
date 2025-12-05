import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout.component';
import PeptideCalculator from '@/components/UI/PeptideCalculator.component';
import FAQ from '@/components/UI/FAQ.component';

const calculatorFAQs = [
  {
    question: "How do I determine the appropriate diluent for my peptide?",
    answer: (
      <p>
        Check the product documentation first. Generally, hydrophilic peptides dissolve well in water or saline, while hydrophobic peptides may require initial dissolution in a small amount of organic solvent (like DMSO or acetic acid) followed by dilution with aqueous buffer. Always consider your downstream application when selecting a diluent.
      </p>
    ),
  },
  {
    question: "My peptide isn't dissolving completely. What should I do?",
    answer: (
      <p>
        First, try gentle warming (30-40°C) and longer dissolution time. If that fails, sonication for 5-10 minutes can help. For very hydrophobic peptides, dissolving in a small volume of DMSO or acetic acid (10%) before diluting with your final buffer often works well.
      </p>
    ),
  },
  {
    question: "How can I ensure sterility of my peptide solution?",
    answer: (
      <p>
        Use aseptic techniques during reconstitution and filter the solution through a 0.22 μm sterile filter. Using bacteriostatic water or adding a sterile preservative like benzyl alcohol (0.9%) can prevent microbial growth for solutions requiring multiple withdrawals.
      </p>
    ),
  },
  {
    question: "How long will my reconstituted peptide remain stable?",
    answer: (
      <p>
        Stability varies significantly depending on the peptide sequence, diluent, storage conditions, and concentration. As a general guideline: 1-7 days at 4°C, 1-4 weeks at -20°C, and months to years at -80°C. Peptides containing cysteine, methionine, tryptophan, or aspartic acid-glycine sequences typically have shorter shelf lives due to oxidation or degradation.
      </p>
    ),
  },
  {
    question: "Can I reconstitute a peptide directly in cell culture media?",
    answer: (
      <p>
        While possible for some peptides, it's generally not recommended. Cell culture media contains components that might interact with your peptide or affect its solubility. It's better to reconstitute in a simpler solution first, then dilute into media just before use.
      </p>
    ),
  },
  {
    question: "Why is molecular weight important for calculating molar concentration?",
    answer: (
      <p>
        Molecular weight allows conversion between mass and moles. Since biological activity often correlates with the number of peptide molecules (moles) rather than mass, knowing the molar concentration is essential for accurate dosing in many applications.
      </p>
    ),
  },
  {
    question: "What should I do if I don't know the exact mass of my peptide?",
    answer: (
      <p>
        Check the Certificate of Analysis or product documentation, which typically specifies the exact mass or percentage purity. If unavailable, contact the manufacturer for this information. Without accurate mass information, your concentration calculations will be approximate.
      </p>
    ),
  },
];

const Calculator: NextPage = () => {
  return (
    <>
      <Head>
        <title>Peptide Calculator | Molecule</title>
        <meta
          name="description"
          content="Calculate peptide reconstitution concentrations and injection volumes with our easy-to-use peptide calculator tool."
        />
      </Head>
      <Layout title="Calculator">
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Column - Content */}
              <div className="lg:col-span-3 space-y-12 lg:order-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  Peptide Reconstitution Calculator
                </h1>
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Peptide Dilution and Reconstitution Guide
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Peptide reconstitution is a critical process in laboratory and clinical settings that involves dissolving lyophilized (freeze-dried) peptides into solution for experimental or therapeutic use. Proper reconstitution ensures accurate concentration, optimal stability, and biological activity of your peptides.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Lyophilized peptides are supplied as dry powders to enhance stability during shipping and storage. Before use, these peptides must be dissolved in an appropriate diluent to create a solution with a specific concentration. Our Peptide Dilution Calculator simplifies this process by performing the necessary calculations for you.
                  </p>
                </section>

                {/* How to Use */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    How to Use the Peptide Calculator
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Streamline peptide reconstitution with our intuitive calculator:
                  </p>
                  <ol className="list-decimal list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>Input the Peptide Mass (mg) from the vial.</li>
                    <li>Specify the Diluent Volume (mL) added to obtain your desired dosage.</li>
                    <li>Input the Target Concentration (mg) from the vial.</li>
                    <li>Choose your Aliquot Volume (mL) (e.g., 0.3ml, 0.5ml, or 1ml).</li>
                  </ol>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    Our calculator performs the complex mathematical transformations, yielding the exact volume needed for peptide reconstitution.
                  </p>
                </section>

                {/* Choosing the Right Diluent */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Choosing the Right Diluent
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    The choice of diluent significantly impacts peptide stability and solubility:
                  </p>
                  <ol className="list-decimal list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>
                      <strong>Bacteriostatic Water</strong>: Contains 0.9% benzyl alcohol as a preservative. Suitable for peptides requiring multiple withdrawals from the same vial. Not recommended for peptides sensitive to benzyl alcohol.
                    </li>
                    <li>
                      <strong>Saline Solution (0.9% NaCl)</strong>: Isotonic solution that mimics physiological conditions. Suitable for peptides that will be used in biological systems or cell culture.
                    </li>
                    <li>
                      <strong>Buffer Solutions</strong>: Maintains a specific pH range. Choose based on the peptide's isoelectric point and application requirements. Common options include phosphate-buffered saline (PBS) or HEPES buffer.
                    </li>
                    <li>
                      <strong>Acetic Acid Solution</strong>: Typically 0.1-10% acetic acid in water. Useful for peptides with low solubility in water or neutral pH solutions.
                    </li>
                  </ol>
                </section>

                {/* Best Practices */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Best Practices for Peptide Reconstitution
                  </h2>
                  <ol className="list-decimal list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>
                      <strong>Always wear gloves</strong> when handling peptides to prevent contamination and degradation.
                    </li>
                    <li>
                      <strong>Allow peptide vials to reach room temperature</strong> before opening to prevent condensation that could affect peptide stability.
                    </li>
                    <li>
                      <strong>Add diluent slowly</strong> down the side of the vial rather than directly onto the peptide powder to prevent foaming and incomplete dissolution.
                    </li>
                    <li>
                      <strong>Gently swirl or rotate</strong> the vial to dissolve the peptide. Avoid vigorous shaking, which can cause foaming and potential degradation.
                    </li>
                    <li>
                      <strong>For difficult-to-dissolve peptides</strong>, try gentle warming (30-40°C) or sonication. Extended sonication should be avoided as it may degrade the peptide.
                    </li>
                    <li>
                      <strong>Sterilize solutions</strong> using a 0.22 μm filter if they will be used in sterile applications.
                    </li>
                    <li>
                      <strong>Aliquot reconstituted peptides</strong> into single-use volumes to avoid repeated freeze-thaw cycles that can degrade peptides.
                    </li>
                  </ol>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    Label all stored peptides with:
                  </p>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>Peptide name and sequence</li>
                    <li>Concentration</li>
                    <li>Diluent used</li>
                    <li>Date of reconstitution</li>
                    <li>Storage conditions</li>
                  </ul>
                </section>

                {/* Storing Reconstituted Peptides */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Storing Reconstituted Peptides
                  </h2>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>
                      <strong>Short-term storage (1-7 days)</strong>: Store at 2-8°C (refrigerated).
                    </li>
                    <li>
                      <strong>Medium-term storage (1-4 weeks)</strong>: Store at -20°C (standard freezer).
                    </li>
                    <li>
                      <strong>Long-term storage (months to years)</strong>: Store at -80°C (ultra-low temperature freezer).
                    </li>
                  </ul>
                </section>

                {/* Common Mistakes */}
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Common Peptide Reconstitution Mistakes
                  </h2>
                  <ol className="list-decimal list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>
                      <strong>Incorrect calculations</strong> leading to inaccurate concentrations
                    </li>
                    <li>
                      <strong>Using inappropriate diluents</strong> for specific peptides
                    </li>
                    <li>
                      <strong>Vigorous shaking</strong> causing foam formation and peptide degradation
                    </li>
                    <li>
                      <strong>Neglecting temperature considerations</strong> during reconstitution
                    </li>
                    <li>
                      <strong>Repeated freeze-thaw cycles</strong> leading to degradation
                    </li>
                    <li>
                      <strong>Ignoring peptide-specific solubility information</strong>
                    </li>
                    <li>
                      <strong>Using contaminated diluents</strong> or non-sterile techniques
                    </li>
                  </ol>
                </section>

                {/* FAQ Section */}
                <section>
                  <FAQ faqs={calculatorFAQs} title="Frequently Asked Questions" />
                </section>
              </div>

              {/* Right Column - Sticky Calculator */}
              <div className="lg:col-span-2 lg:order-2">
                <div className="lg:sticky lg:top-32">
                  <PeptideCalculator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Calculator;

