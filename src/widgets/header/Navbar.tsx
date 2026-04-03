import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthValue } from "@/features/auth/hooks/useAuthValue";
import { useCart } from "@/features/cart/hooks/useCart";
import { ROUTES } from "@/routes/routePaths";

import SearchBar from "./components/SearchBar";
import UserMenu from "./components/UserMenu";
import MoreInfo from "./components/MoreInfo";

import logo from "@/assets/icons/logo.png";
import logoName from "@/assets/icons/logoname.png";

const Navbar = () => {
  const { isAdmin } = useAuthValue();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-[100] border-b border-black/20">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6 h-16 flex items-center gap-8">
        <Link
            to={ROUTES.HOME}
            className="group transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center">
            <div className="bg-[#ffe51f] flex items-center px-6 md:px-14 py-2.5 rounded-xl gap-2.5 shadow-sm group-hover:shadow-md transition-shadow">
              <img
                  src={logo}
                  alt="Flipkart Logo"
                  className="w-5 md:w-6 object-contain"
              />
              <img
                  src={logoName}
                  alt="Flipkart"
                  className="w-10 md:w-12 object-contain"
              />
            </div>
          </div>
        </Link>
        {/* Search */}
        <SearchBar />

        {/* Actions */}
        <nav className="hidden md:flex items-center gap-6 ml-auto pr-2">
          {/* ✅ USER MENU */}
          <UserMenu />

          {/* More Dropdown Placeholder */}
          <MoreInfo />

          {!isAdmin && (
            <Link
              to={ROUTES.CART}
              className="flex items-center gap-2 text-slate-700 text-[15px] font-medium relative hover:text-primary transition-colors ml-2"
            >
              <div className="relative">
                <ShoppingCart className="w-5.5 h-5.5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#ff6161] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-white px-0.5">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <span className="ml-1">Cart</span>
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto text-slate-700"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
