import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routePaths";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Lazy Imports
const HomePage = lazy(() => import("@/pages/HomePage"));
const ProductListPage = lazy(() => import("@/pages/ProductListPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const OrderDetailPage = lazy(() => import("@/pages/OrderDetailPage"));
const OrderConfirmationPage = lazy(() => import("@/pages/OrderConfirmationPage"));

const AccountLayout = lazy(() => import("@/features/account"));
const OrdersTab = lazy(() => import("@/features/account/tabs/OrdersTab"));
const AddressTab = lazy(() => import("@/features/account/tabs/AddressTab"));
const ProfileTab = lazy(() => import("@/features/account/tabs/ProfileTab"));

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const AdminLayout = lazy(() => import("@/features/admin/components/AdminLayout"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage"));
const AdminProductsPage = lazy(() => import("@/pages/admin/AdminProductsPage"));
const AdminOrdersPage = lazy(() => import("@/pages/admin/AdminOrdersPage"));
const AdminCategoriesPage = lazy(() => import("@/pages/admin/AdminCategoriesPage"));

// Loader
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const AppRouter = () => (
  <Routes>
    {/* 🔹 Public Routes */}
    <Route
      path={ROUTES.HOME}
      element={
        <Suspense fallback={<PageLoader />}>
          <HomePage />
        </Suspense>
      }
    />

    <Route
      path={ROUTES.PRODUCTS}
      element={
        <Suspense fallback={<PageLoader />}>
          <ProductListPage />
        </Suspense>
      }
    />

    <Route
      path={ROUTES.PRODUCT_DETAIL}
      element={
        <Suspense fallback={<PageLoader />}>
          <ProductDetailPage />
        </Suspense>
      }
    />

    <Route
      path={ROUTES.LOGIN}
      element={
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      }
    />

    <Route
      path={ROUTES.REGISTER}
      element={
        <Suspense fallback={<PageLoader />}>
          <RegisterPage />
        </Suspense>
      }
    />

    {/* 🔐 Protected Routes */}
    <Route element={<PrivateRoute />}>
      <Route
        path={ROUTES.CART}
        element={
          <Suspense fallback={<PageLoader />}>
            <CartPage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CHECKOUT}
        element={
          <Suspense fallback={<PageLoader />}>
            <CheckoutPage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ORDERS}
        element={
          <Suspense fallback={<PageLoader />}>
            <OrdersPage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ORDER_DETAIL}
        element={
          <Suspense fallback={<PageLoader />}>
            <OrderDetailPage />
          </Suspense>
        }
      />

      <Route
        path="/order-confirmation"
        element={
          <Suspense fallback={<PageLoader />}>
            <OrderConfirmationPage />
          </Suspense>
        }
      />

      {/* 👤 Account Layout (Nested Lazy) */}
      <Route
        path={ROUTES.ACCOUNT}
        element={
          <Suspense fallback={<PageLoader />}>
            <AccountLayout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <ProfileTab />
            </Suspense>
          }
        />
        <Route
          path="orders"
          element={
            <Suspense fallback={<PageLoader />}>
              <OrdersTab />
            </Suspense>
          }
        />
        <Route
          path="addresses"
          element={
            <Suspense fallback={<PageLoader />}>
              <AddressTab />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProfileTab />
            </Suspense>
          }
        />
      </Route>
    </Route>

    {/* 🛠️ Admin Routes */}
    <Route element={<AdminRoute />}>
      <Route
        element={
          <Suspense fallback={<PageLoader />}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route
          path={ROUTES.ADMIN.ROOT}
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminDashboardPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.ADMIN.PRODUCTS}
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminProductsPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.ADMIN.ORDERS}
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminOrdersPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.ADMIN.CATEGORIES}
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminCategoriesPage />
            </Suspense>
          }
        />
      </Route>
    </Route>

    {/* ❌ Not Found */}
    <Route
      path="*"
      element={
        <Suspense fallback={<PageLoader />}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </Routes>
);

export default AppRouter;