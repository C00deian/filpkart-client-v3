import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import { ROUTES } from "@/routes/routePaths";

import SearchBar from "../layout/Header/components/SearchBar";
import UserMenu from "../layout/Header/components/UserMenu";

const Navbar = () => {
  const { isAdmin } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex flex-col leading-none">
          <span className="italic font-bold text-xl text-white">Flipkart</span>
        </Link>

        {/* Search */}
        <SearchBar />

        {/* Actions */}
        <nav className="hidden md:flex items-center gap-6 ml-2">
          {/* ✅ USE YOUR EXISTING MENU */}
          <UserMenu />

          {!isAdmin && (
            <Link
              to={ROUTES.CART}
              className="flex items-center gap-1.5 text-white text-sm font-medium relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>

              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-400 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto text-white"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
