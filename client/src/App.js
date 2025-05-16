import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import PaymentPage from "./pages/PaymentPage";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import EditListing from "./pages/EditListing";

// DUMMY Sandbox client ID from PayPal developer
const initialOptions = {
  "client-id": "AZZSq453m7L5f4z-S9J1d9p_Q4HUOXfWhY8umh7dTbd1qRKCTs6CM8AVxJFOTE5jhqfSDJrW5AWctn6p", // 'test' is a special keyword for demo
  currency: "USD",
};


function App() {
  return (
     <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />

        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
