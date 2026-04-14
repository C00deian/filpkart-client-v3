import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  Home,
  Grid2x2,
  UserRound,
  LayoutGrid,
} from "lucide-react";
import { useAuthValue } from "@/features/auth/hooks/useAuthValue";
import { useCart } from "@/features/cart/hooks/useCart";
import { useCategories } from "@/features/products/hooks/useCategories";
import { useCurrentUserDisplayName } from "@/features/account/hooks/useCurrentUserDisplayName";
import { ROUTES } from "@/routes/routePaths";

import SearchBar from "./components/SearchBar";
import UserMenu from "./components/UserMenu";
import MoreInfo from "./components/MoreInfo";

import logo from "@/assets/icons/logo.png";
import logoName from "@/assets/icons/logoname.png";
import { useState } from "react";

const Navbar = () => {
  const { user, isAdmin } = useAuthValue();
  const { itemCount } = useCart();
  const { data: categories } = useCategories();
  const { profile } = useCurrentUserDisplayName();
  const [activeMegaCategory, setActiveMegaCategory] = useState<{
    id: string | number;
    name: string;
    slug: string;
  } | null>(null);

  const quickLinks = categories?.slice(0, 8) ?? [];
  const displayName =
    profile?.name ||
    user?.name ||
    (user?.email ? user.email.split("@")[0] : "");

  return (
    <header className="sticky top-0 z-[100] border-b border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-[1248px] mx-auto px-3 sm:px-4 md:px-6 py-2.5 md:py-3 flex flex-wrap items-center gap-2 md:gap-4">
        <Link
          to={ROUTES.HOME}
          className="group transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="bg-[#ffe51f] flex items-center px-3 sm:px-4 md:px-6 py-2 rounded-xl gap-2 shadow-sm group-hover:shadow-md transition-shadow">
            <img
              src={logo}
              alt="Flipkart Logo"
              className="w-5 md:w-6 object-contain"
              width={24}
              height={24}
            />
            <img
              src={logoName}
              alt="Flipkart"
              className="w-11 md:w-12 object-contain"
              width={48}
              height={24}
            />
          </div>
        </Link>

        <div className="flex items-center gap-3 ml-auto md:hidden">
          {!isAdmin && (
            <Link
              to={ROUTES.CART}
              className="relative text-slate-700"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center border border-white px-0.5">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          )}
          <Link
            to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}
            className="text-fluid-sm text-slate-700 font-semibold max-w-[8rem] truncate"
          >
            {user ? displayName || "Account" : "Login"}
          </Link>
        </div>

        <div className="order-3 w-full md:order-2 md:flex-1 md:w-auto">
          <SearchBar />
        </div>

        <nav className="hidden md:flex items-center gap-6 ml-auto pr-2 order-2">
          <UserMenu />
          <MoreInfo />

          {!isAdmin && (
            <Link
              to={ROUTES.CART}
              className="flex items-center gap-2 text-slate-700 text-fluid-base font-medium relative hover:text-primary transition-colors ml-2"
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
      </div>

      <div
        className="hidden md:block border-t border-slate-200/70 bg-white"
        onMouseLeave={() => setActiveMegaCategory(null)}
      >
        <div className="max-w-[1248px] mx-auto px-6 py-2.5 flex items-center gap-5 overflow-x-auto no-scrollbar">
          <Link
            to={ROUTES.PRODUCTS}
            className="text-fluid-sm font-semibold text-slate-800 hover:text-primary whitespace-nowrap flex items-center gap-1.5"
          >
            <LayoutGrid className="w-4 h-4" /> Categories
          </Link>
          {quickLinks.map((category) => (
            <Link
              key={category.id}
              to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
              className="text-fluid-sm text-slate-600 hover:text-primary whitespace-nowrap"
              onMouseEnter={() =>
                setActiveMegaCategory({
                  id: category.id,
                  name: category.name,
                  slug: category.slug,
                })
              }
            >
              {category.name}
            </Link>
          ))}
        </div>

        {activeMegaCategory && (
          <div className="border-t border-slate-100 bg-white">
            <div className="max-w-[1248px] mx-auto px-6 py-4 grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <p className="text-fluid-sm text-slate-500 uppercase tracking-wide mb-2">
                  Shop by Category
                </p>
                <Link
                  to={`${ROUTES.PRODUCTS}?category=${activeMegaCategory.slug}`}
                  className="text-fluid-lg font-semibold text-slate-900 hover:text-primary"
                >
                  {activeMegaCategory.name}
                </Link>
              </div>

              <div className="col-span-3 grid grid-cols-3 gap-3">
                {["Top Picks", "Best Seller", "New Arrivals", "Budget Buys", "Trending", "Staff Choice"].map((label) => (
                  <Link
                    key={label}
                    to={`${ROUTES.PRODUCTS}?category=${activeMegaCategory.slug}`}
                    className="rounded-lg border border-slate-100 px-3 py-2 text-fluid-sm text-slate-700 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[120] bg-white border-t border-slate-200 px-2 py-2 grid grid-cols-4">
        <NavLink
          to={ROUTES.HOME}
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 text-[11px] transition-colors ${isActive ? "text-primary" : "text-slate-700"}`
          }
        >
          <Home className="w-4 h-4" />
          Home
        </NavLink>
        <NavLink
          to={ROUTES.PRODUCTS}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 text-[11px] transition-colors ${isActive ? "text-primary" : "text-slate-700"}`
          }
        >
          <Grid2x2 className="w-4 h-4" />
          Categories
        </NavLink>
        <NavLink
          to={ROUTES.CART}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 text-[11px] relative transition-colors ${isActive ? "text-primary" : "text-slate-700"}`
          }
        >
          <span className="relative inline-flex">
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] px-0.5 flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </span>
          Cart
        </NavLink>
        <NavLink
          to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 text-[11px] transition-colors ${isActive ? "text-primary" : "text-slate-700"}`
          }
        >
          <UserRound className="w-4 h-4" />
          {user ? "Account" : "Login"}
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
