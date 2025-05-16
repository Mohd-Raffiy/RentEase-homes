import "../styles/PaymentPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  const { bookingForm, listing, dayCount } = location.state || {};

  if (!bookingForm || !listing) {
    return <div>Invalid booking. Please go back and try again.</div>;
  }

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
          <p><strong>Price per night:</strong> ₹{listing.price}</p>
          <p><strong>Total:</strong> ₹{bookingForm.totalPrice}</p>
        </div>

        {/* Confirm & Pay Button */}
        {!showPayPal && (
          <button className="pay-btn" onClick={() => setShowPayPal(true)} disabled={loading}>
            {loading ? "Processing..." : "CONFIRM & PAY"}
          </button>
        )}

        {/* PayPal Buttons */}
        {showPayPal && (
          <div className="paypal-popup">
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: (bookingForm.totalPrice / 85).toFixed(2), // ₹ to USD conversion
                      },
                      description: `Booking for ${listing.title}`,
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                setLoading(true);
                try {
                  const order = await actions.order.capture();
                  console.log("Order captured:", order);

                  const response = await fetch("http://localhost:3001/bookings/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingForm),
                  });

                  if (response.ok) {
                    alert("Payment successful and booking confirmed!");
                    navigate(`/${bookingForm.customerId}/trips`);
                  } else {
                    alert("Booking failed after payment.");
                  }
                } catch (err) {
                  console.error("Payment error:", err.message);
                  alert("An error occurred. Try again.");
                } finally {
                  setLoading(false);
                }
              }}
              onCancel={() => {
                alert("Payment cancelled.");
                setShowPayPal(false);
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                alert("Payment failed.");
                setShowPayPal(false);
              }}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
