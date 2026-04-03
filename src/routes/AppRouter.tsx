import { lazy, Suspense, ComponentType, FC } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "@/components/ui/Loader";
import { ROUTES } from "./routePaths";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

/**
 * 🚀 Type-Safe Loadable HOC
 * Ensures that props passed to the lazy component are correctly typed.
 */
const Loadable = <P extends object>(Component: ComponentType<P>): FC<P> => (props) => (
  <Suspense fallback={<PageLoader />}>
    <Component {...props} />
  </Suspense>
);


// Pages
const HomePage = Loadable(lazy(() => import("@/pages/HomePage")));
const ProductListPage = Loadable(lazy(() => import("@/pages/ProductListPage")));
const ProductDetailPage = Loadable(lazy(() => import("@/pages/ProductDetailPage")));
const CartPage = Loadable(lazy(() => import("@/pages/CartPage")));
const CheckoutPage = Loadable(lazy(() => import("@/pages/CheckoutPage")));
const OrdersPage = Loadable(lazy(() => import("@/pages/OrdersPage")));
const OrderDetailPage = Loadable(lazy(() => import("@/pages/OrderDetailPage")));
const OrderConfirmationPage = Loadable(lazy(() => import("@/pages/OrderConfirmationPage")));
const LoginPage = Loadable(lazy(() => import("@/pages/LoginPage")));
const RegisterPage = Loadable(lazy(() => import("@/pages/RegisterPage")));
const NotFoundPage = Loadable(lazy(() => import("@/pages/NotFoundPage")));

// Features & Layouts
const AccountLayout = Loadable(lazy(() => import("@/features/account")));
const OrdersTab = Loadable(lazy(() => import("@/features/account/tabs/OrdersTab")));
const AddressTab = Loadable(lazy(() => import("@/features/account/tabs/AddressTab")));
const ProfileTab = Loadable(lazy(() => import("@/features/account/tabs/ProfileTab")));

// Admin
const AdminLayout = Loadable(lazy(() => import("@/features/admin/components/AdminLayout")));
const AdminDashboardPage = Loadable(lazy(() => import("@/pages/admin/AdminDashboardPage")));
const AdminProductsPage = Loadable(lazy(() => import("@/pages/admin/AdminProductsPage")));
const AdminOrdersPage = Loadable(lazy(() => import("@/pages/admin/AdminOrdersPage")));
const AdminCategoriesPage = Loadable(lazy(() => import("@/pages/admin/AdminCategoriesPage")));

const AppRouter: FC = () => (
  <Routes>
    {/* 🔹 Public Routes */}
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
    <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

    {/* 🔐 Protected Routes (Customer) */}
    <Route element={<PrivateRoute />}>
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
      <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
      <Route path={ROUTES.ORDER_DETAIL} element={<OrderDetailPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

      {/* 👤 Account Nesting */}
      <Route path={ROUTES.ACCOUNT} element={<AccountLayout />}>
        <Route index element={<ProfileTab />} />
        <Route path="orders" element={<OrdersTab />} />
        <Route path="addresses" element={<AddressTab />} />
        <Route path="profile" element={<ProfileTab />} />
      </Route>
    </Route>

    {/* 🛠️ Admin Routes */}
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.ROOT} element={<AdminDashboardPage />} />
        <Route path={ROUTES.ADMIN.PRODUCTS} element={<AdminProductsPage />} />
        <Route path={ROUTES.ADMIN.ORDERS} element={<AdminOrdersPage />} />
        <Route path={ROUTES.ADMIN.CATEGORIES} element={<AdminCategoriesPage />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;