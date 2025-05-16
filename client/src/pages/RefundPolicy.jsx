// ✅ RefundPolicy.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/RefundPolicy.scss";

const RefundPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="static-page">
        <h1>Returns & Refund Policy</h1>
        <p>
          RentEase prioritizes guest satisfaction. If you need to cancel a booking or request a refund,
          the following policies apply:
        </p>
        <ul>
          <li>
            Full refunds are available for cancellations made at least 48 hours before the check-in date.
          </li>
          <li>
            Cancellations made within 48 hours of check-in may incur a penalty as outlined in the listing.
          </li>
          <li>
            If a host cancels your booking, you will receive a 100% refund including all service fees.
          </li>
          <li>
            In case the property does not match the listing description or is unsafe, you may contact
            our support team within 24 hours of check-in to initiate a refund review.
          </li>
          <li>
            Refunds are processed within 5–7 business days after approval and returned via the original
            payment method.
          </li>
        </ul>
        <p>
          To request a refund, please contact our support team at support@rentease.com with your booking ID
          and details.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default RefundPolicy;
