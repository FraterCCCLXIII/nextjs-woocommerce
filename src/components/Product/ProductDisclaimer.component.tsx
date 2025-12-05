const ProductDisclaimer = () => {
  return (
    <div className="w-full mt-12 pt-8 border-t border-gray-200">
      <div className="bg-gray-50 rounded-lg p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Disclaimer: For Research Purposes Only
        </h3>
        <div className="text-sm text-gray-700 leading-relaxed space-y-4">
          <p>
            This content is provided strictly for research purposes and does not constitute an
            endorsement or recommendation for the non-laboratory application or improper handling
            of peptides designed for research. The information, including discussions about
            specific peptides and their researched benefits, is presented for informational
            purposes only and must not be construed as health, clinical, or legal guidance, nor an
            encouragement for non-research use in humans.
          </p>
          <p>
            Peptides described here are solely for use in structured scientific study by
            authorized individuals. We advise consulting with research experts, medical
            practitioners, or legal counsel prior to any decisions about obtaining or utilizing
            these peptides.
          </p>
          <p>
            The expectation of responsible, ethical utilization of this information for legitimate
            investigative and scholarly objectives is paramount. This notice is dynamic and governs
            all provided content on research peptides.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisclaimer;

