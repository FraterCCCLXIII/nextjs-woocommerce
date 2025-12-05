import Link from 'next/link';
import Logo from '@/components/UI/Logo.component';
import FooterDisclaimer from './FooterDisclaimer.component';

/**
 * Renders Footer of the application matching Medusa design.
 * @function Footer
 * @returns {JSX.Element} - Rendered component
 */
const Footer = () => {
  // Static categories - can be replaced with dynamic data from WordPress/WooCommerce
  const categories = [
    { name: 'Research Peptides', href: '/categories' },
    { name: 'Peptide Compounds', href: '/categories' },
  ];

  // Static collections - can be replaced with dynamic data from WordPress/WooCommerce
  const collections = [
    { title: 'Featured Products', href: '/catalog' },
    { title: 'New Arrivals', href: '/catalog' },
  ];

  return (
    <footer className="border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <Link
              href="/"
              className="flex items-center"
            >
              <Logo className="h-6 w-auto" />
            </Link>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {categories && categories.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-small-semi text-gray-900">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {categories.slice(0, 6).map((c, index) => (
                    <li
                      className="flex flex-col gap-2 text-gray-600 text-small-regular"
                      key={index}
                    >
                      <Link
                        className="hover:text-gray-900 transition-colors"
                        href={c.href}
                        data-testid="category-link"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-small-semi text-gray-900">
                  Collections
                </span>
                <ul
                  className={`grid grid-cols-1 gap-2 text-gray-600 text-small-regular ${
                    collections.length > 3 ? 'grid-cols-2' : ''
                  }`}
                >
                  {collections.slice(0, 6).map((c, index) => (
                    <li key={index}>
                      <Link
                        className="hover:text-gray-900 transition-colors"
                        href={c.href}
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="text-small-semi text-gray-900">Company</span>
              <ul className="grid grid-cols-1 gap-y-2 text-gray-600 text-small-regular">
                <li>
                  <Link
                    href="/pages/about-us"
                    className="hover:text-gray-900 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/contact"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/terms-of-service"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/privacy-policy"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/returns-and-refunds"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Returns & Refunds
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full mb-16">
          <div className="flex w-full justify-between items-start text-gray-600">
            <p className="text-small-regular">
              © {new Date().getFullYear()} Molecule. All rights reserved.
            </p>
          </div>
          <div className="flex justify-start">
            <FooterDisclaimer />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

