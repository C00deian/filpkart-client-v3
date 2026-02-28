import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routePaths";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProductListPage = lazy(() => import("@/pages/ProductListPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const OrderConfirmationPage = lazy(
  () => import("@/pages/OrderConfirmationPage"),
);
// const AccountPage          = lazy(() => import('@/pages/AccountPage'))
const AccountLayout = lazy(() => import("@/features/account"));
const OverviewTab = lazy(() => import("@/features/account/tabs/OverviewTab"));
const OrdersTab = lazy(() => import("@/features/account/tabs/OrdersTab"));
const AddressTab = lazy(() => import("@/features/account/tabs/AddressTab"));
const ProfileTab = lazy(() => import("@/features/account/tabs/ProfileTab"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const AdminLayout = lazy(
  () => import("@/features/admin/components/AdminLayout"),
);
const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboardPage"),
);
const AdminProductsPage = lazy(() => import("@/pages/admin/AdminProductsPage"));
const AdminOrdersPage = lazy(() => import("@/pages/admin/AdminOrdersPage"));
const AdminCategoriesPage = lazy(
  () => import("@/pages/admin/AdminCategoriesPage"),
);

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
      <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

      {/* Protected */}
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path={ROUTES.ACCOUNT} element={<AccountLayout />}>
          <Route index element={<OverviewTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="addresses" element={<AddressTab />} />
          <Route path="profile" element={<ProfileTab />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.ROOT} element={<AdminDashboardPage />} />
          <Route path={ROUTES.ADMIN.PRODUCTS} element={<AdminProductsPage />} />
          <Route path={ROUTES.ADMIN.ORDERS} element={<AdminOrdersPage />} />
          <Route
            path={ROUTES.ADMIN.CATEGORIES}
            element={<AdminCategoriesPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRouter;
