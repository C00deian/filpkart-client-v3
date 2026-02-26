import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import { ROUTES } from "@/routes/routePaths";

import SearchBar from "../layout/Header/components/SearchBar";
import UserMenu from "../layout/Header/components/UserMenu";
import MoreInfo from "./MoreInfo";

const Navbar = () => {
  const { isAdmin } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-[100] border-b border-black/20">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6 h-16 flex items-center gap-8">
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
