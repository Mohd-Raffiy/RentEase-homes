// ✅ TermsAndConditions.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/TermsAndConditions.scss";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="static-page">
        <h1>Terms and Conditions</h1>
        <p>
          By accessing or using the RentEase platform, you agree to comply with and be bound by the following terms and conditions:
        </p>
        <ul>
          <li>
            Users must be at least 18 years old to register and make bookings or list properties on RentEase.
          </li>
          <li>
            All information provided during registration or listing creation must be accurate and complete.
          </li>
          <li>
            Guests must adhere to the check-in/check-out times and rules provided by the property host.
          </li>
          <li>
            RentEase is not responsible for any disputes arising between guests and hosts but will assist
            in resolution based on our policies.
          </li>
          <li>
            Users are prohibited from engaging in illegal activities on or through the platform.
          </li>
          <li>
            RentEase reserves the right to modify, suspend, or terminate user accounts for violations
            without prior notice.
          </li>
          <li>
            All intellectual property related to the platform including design, logo, and content belongs to RentEase.
          </li>
        </ul>
        <p>
          For questions or clarifications regarding our terms, please contact support@rentease.com.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;