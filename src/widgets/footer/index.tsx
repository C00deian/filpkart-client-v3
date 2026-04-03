const footerLinks = {
  About: [
    "Contact Us",
    "About Us",
    "Careers",
    "FlipShop Stories",
    "Press",
    "Corporate Information",
  ],
  Help: [
    "Payments",
    "Shipping",
    "Cancellation & Returns",
    "FAQ",
    "Report Infringement",
  ],
  Policy: [
    "Return Policy",
    "Terms of Use",
    "Security",
    "Privacy",
    "Sitemap",
    "EPR Compliance",
  ],
  Social: ["Facebook", "Twitter", "YouTube"],
};

const Footer = () => (
  <footer className="bg-[#172337] text-white mt-auto">
    <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
      {Object.entries(footerLinks).map(([section, links]) => (
        <div key={section}>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
            {section}
          </p>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-xs text-slate-300 hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-slate-700">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-yellow-400 cursor-pointer hover:text-yellow-300">
            <span>🏪</span> Sell on Flipkart
          </span>
          <span className="flex items-center gap-1.5 text-yellow-400 cursor-pointer hover:text-yellow-300">
            <span>🎁</span> Gift Cards
          </span>
          <span className="flex items-center gap-1.5 text-yellow-400 cursor-pointer hover:text-yellow-300">
            <span>❓</span> Help Center
          </span>
        </div>
        <span>© 2007–2024 Flipkart.com</span>
      </div>
    </div>
  </footer>
);
export default Footer;
