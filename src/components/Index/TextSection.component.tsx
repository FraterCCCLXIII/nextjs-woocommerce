/**
 * Renders Text Section for Index page
 * @function TextSection
 * @returns {JSX.Element} - Rendered component
 */
const TextSection = () => (
  <section className="w-full py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
          Lab-tested <em className="font-normal italic">before</em> they hit your lab. Your research starts with{" "}
          <span className="underline">ours.</span>
        </h2>
      </div>
    </div>
  </section>
);

export default TextSection;

