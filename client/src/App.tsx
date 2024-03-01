import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import './style.css';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProfilePage from './pages/ProfilePage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import TrackOrderPage from './pages/TrackOrderPage';
import { ToastContainer } from 'react-toastify';
import BookDetailsPage from './pages/BookDetailsPage';
import Books from './components/Books';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/user/forgotPassword" element={<ForgotPassword />} />

        <Route
          path="/user/resetPassword/token/:tokenId"
          element={<ResetPassword />}
        />
        {/* <Route path='/shop/forgot-password' element={<ShopForgotPassword />} /> */}

        {/* <Route
					path='/shop/reset-password/token/:tokenId'
					element={<ShopResetPassword />}
				/> */}

        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/checkout"
          element={
            // <ProtectedRoute>
            <CheckoutPage />
            // </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            // <ProtectedRoute>
            <ProfilePage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            // <ProtectedRoute>
            <OrderDetailsPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            // <ProtectedRoute>
            <TrackOrderPage />
            // </ProtectedRoute>
          }
        />
        {/* <Route path="/shop/preview/:id" element={<ShopPreviewPage />} /> */}
        {/* shop Routes */}
        {/* <Route path="/shop-create" element={<ShopCreatePage />} /> */}
        {/* <Route path="/shop-login" element={<ShopLoginPage />} /> */}
        {/* <Route path="/reset-password" element={<ShopResetPassword />} /> */}
        {/* <Route path="/forgot-password" element={<ShopForgotPassword />} /> */}
        {/* <Route
      path="/shop/:id"
      element={
        <SellerProtectedRoute>
          <ShopHomePage />
        </SellerProtectedRoute>
      }
    /> */}
        {/* <Route
      path="/settings"
      element={
        <SellerProtectedRoute>
          <ShopSettingsPage />
        </SellerProtectedRoute>
      }
    /> */}
        {/* <Route
      path="/dashboard"
      element={
        <SellerProtectedRoute>
          <ShopDashboardPage />
        </SellerProtectedRoute>
      }
    /> */}
        {/* <Route
      path="/dashboard-create-product"
      element={
        <SellerProtectedRoute>
          <ShopCreateProduct />
        </SellerProtectedRoute>
      }
    /> */}
        {/* <Route
      path="/dashboard-orders"
      element={
        <SellerProtectedRoute>
          <ShopAllOrders />
        </SellerProtectedRoute>
      }
    /> */}

        {/* 
    <Route
      path="/order/:id"
      element={
        <SellerProtectedRoute>
          <ShopOrderDetails />
        </SellerProtectedRoute>
      }
    /> */}
        {/* <Route
      path="/dashboard-products"
      element={
        <SellerProtectedRoute>
          <ShopAllProducts />
        </SellerProtectedRoute>
      }
    /> */}

        {/* Admin Routes */}
        {/* <Route
      path="/admin/dashboard"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardPage />
        </ProtectedAdminRoute>
      }
    /> */}
        {/* <Route
      path="/admin-users"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardUsers />
        </ProtectedAdminRoute>
      }
    /> */}
        {/* <Route
      path="/admin-sellers"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardSellers />
        </ProtectedAdminRoute>
      }
    /> */}
        {/* <Route
      path="/admin-orders"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardOrders />
        </ProtectedAdminRoute>
      }
    /> */}
        {/* <Route
      path="/admin-products"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardProducts />
        </ProtectedAdminRoute>
      }
    /> */}
        {/* <Route
      path="/admin-events"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardEvents />
        </ProtectedAdminRoute>
      }
    /> */}
        {/* <Route
      path="/admin-withdraw-request"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardWithdraw />
        </ProtectedAdminRoute>
      }
    /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
