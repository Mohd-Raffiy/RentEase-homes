import React, { useState } from "react";
import "../styles/PaymentPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Move useState here — top level, no conditions
  const [loading, setLoading] = useState(false);

  const { bookingForm, listing, dayCount } = location.state || {};

  // ❌ Keep conditional return AFTER all hooks
  if (!bookingForm || !listing) {
    return <div>Invalid booking. Please go back and try again.</div>;
  }

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        alert("Payment successful and booking confirmed!");
        navigate(`/${bookingForm.customerId}/trips`);
      } else {
        alert("Payment failed. Try again.");
      }
    } catch (err) {
      console.log("Payment error:", err.message);
      alert("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <h1>Payment Summary</h1>

        <div className="summary">
          <p><strong>Property:</strong> {listing.title}</p>
          <p><strong>Host:</strong> {listing.creator.firstName} {listing.creator.lastName}</p>
          <p><strong>Location:</strong> {listing.city}, {listing.province}, {listing.country}</p>
          <p><strong>Stay:</strong> {bookingForm.startDate} to {bookingForm.endDate}</p>
          <p><strong>Nights:</strong> {dayCount}</p>
          <p><strong>Price per night:</strong> ${listing.price}</p>
          <p><strong>Total:</strong> ${bookingForm.totalPrice}</p>
        </div>

        <button className="pay-btn" onClick={handleConfirmPayment} disabled={loading}>
          {loading ? "Processing..." : "CONFIRM & PAY"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
