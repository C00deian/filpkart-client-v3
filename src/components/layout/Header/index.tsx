import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import { ROUTES } from "@/routes/routePaths";
import SearchBar from "./components/SearchBar";
import UserMenu from "./components/UserMenu";

const Header = () => {
  const { user, isAdmin, isLoading } = useAuth(); // ✅ use real state
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary sticky top-0 z-[60] shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex-shrink-0 flex flex-col leading-none"
        >
          <span className="italic font-bold text-xl text-white tracking-tight">
            Flipkart
          </span>

          <span className="text-[10px] text-yellow-300 font-medium flex items-center gap-0.5">
            Explore <span className="text-yellow-300">Plus</span>
            <svg
              className="w-2.5 h-2.5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </Link>

        {/* Search */}
        <SearchBar />

        {/* Nav Actions */}
        <nav className="hidden md:flex items-center gap-6 ml-2 flex-shrink-0">
          {/* ✅ Loading-safe */}
          {!isLoading && <UserMenu />}

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

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto text-white p-1"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
