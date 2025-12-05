"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "Are these peptides quality tested?",
    answer: (
      <p>
        Absolutely. Our analytical testing is conducted by Janoshik Analytical, an independent third-party laboratory to verify the identity, purity, and composition of our research products. Each CoA includes purity analysis, peptide sequence confirmation, and date of analysis.
      </p>
    ),
  },
  {
    question: "What are typical delivery times?",
    answer: (
      <p>
        Delivery for our free shipping option typically takes 3-5 business days. We ship from right here in the USA to all US addresses. We also provide an option for next day shipping for an extra charge. Please allow 24 hours for processing. <br /><br />
        Every package comes with professional packaging, tracking updates via email, and does not require a signature upon delivery.
      </p>
    ),
  },
  {
    question: "How should these compounds be stored?",
    answer: (
      <p>
        Our peptides are shipping in lyophilized form, which is stable at room temperature during transit. Once received, store unopened vials in a cool, dry place.
      </p>
    ),
  },
  {
    question: "Are products stable during shipping?",
    answer: (
      <p>
        Our peptides are shipped in lyophilized (freeze-dried) form, which ensures stability during transit. This powder form is highly stable at room temperature and resistant to temperature fluctuations that occur during shipping.<br /><br />
        Research has shown no significant degradation or loss of purity when lyophilized peptides are exposed to room temperature during typical shipping timeframes. Each batch is verified for purity upon production, and our stability testing confirms maintenance of product integrity during standard shipping conditions.
      </p>
    ),
  },
  {
    question: "What are your bulk ordering options?",
    answer: (
      <p>
        For bulk inquiries and volume pricing, please <Link href="/pages/contact" title="Contact" className="underline hover:no-underline">contact us</Link>.
      </p>
    ),
  },
  {
    question: "What is your return/refund policy for research peptides?",
    answer: (
      <p>
        All sales are final. Since we're dealing with sensitive research compounds that require strict quality control, we can't accept returns or exchanges.<br /><br />
        Questions about your order? We're happy to help - just reach out.
      </p>
    ),
  },
  {
    question: "What payment methods do you accept?",
    answer: (
      <>
        <p>
          We accept credit/debit cards. After you place an order, we'll email you a secure payment link. Please complete payment within 48 hours. Unpaid orders are automatically canceled after that window.
        </p>
        <p>
          If you don't see the email, check spam/promotion or contact support and we'll resend the link.
        </p>
      </>
    ),
  },
  {
    question: "Are these peptides legal to buy for research in the USA?",
    answer: (
      <>
        <p>
          Yes. When purchased for laboratory/research use only and handled in compliance with all applicable federal, state, and local regulations. We sell reagents labeled "Not for human consumption," not as drugs or supplements.
        </p>
        <p>
          Some compounds may be restricted in certain jurisdictions. The buyer is responsible for knowing and following their local rules.
        </p>
      </>
    ),
  },
  {
    question: "Do I need a business or institutional account to order?",
    answer: (
      <p>
        No. Individual researchers, labs, and institutions can order. During checkout you must confirm research intent and agree to our Terms. For certain items or larger orders, we may request additional verification or documentation and reserve the right to decline orders that don't meet compliance standards.
      </p>
    ),
  },
  {
    question: "What is the shelf life/expiration of unopened vials?",
    answer: (
      <p>
        Each lot lists a best-by/expiration on the vial label and COA. As general guidance, lyophilized peptides stored as directed are typically stable 12–24 months (often longer at –20 °C). Short shipping periods at ambient temperature are normal. Actual stability depends on sequence and storage conditions.
      </p>
    ),
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Intro Section */}
          <div className="section-stack__intro">
            <div className="flex flex-col gap-10">
              <div className="prose">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-chakra-petch">
                  Got questions?<br />
                  We've got <span className="underline">answers.</span>
                </h3>
              </div>
            </div>
          </div>

          {/* Accordion Section */}
          <div className="section-stack__main">
            <div className="accordion-box rounded-lg p-6">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="accordion group border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className={`accordion__toggle w-full flex gap-4 py-6 font-semibold text-xl hover:text-gray-700 transition-colors text-left ${
                        isOpen ? "items-start" : "items-center"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`circle-plus flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center transition-all duration-200 ${
                          isOpen ? "rotate-45 bg-gray-900 text-white" : "bg-transparent text-gray-900"
                        } hover:bg-gray-900 hover:text-white`}
                      >
                        <Plus className="w-3 h-3" />
                      </span>
                      <h4 className="flex-1">{faq.question}</h4>
                    </button>

                    <div
                      className={`accordion__content overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[1000px] opacity-100 pb-6" : "max-h-0 opacity-0 pb-0"
                      }`}
                    >
                      <div className="prose pl-12">
                        <div className="text-base leading-relaxed text-gray-700">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

