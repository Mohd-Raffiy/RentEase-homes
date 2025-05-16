import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AboutUs.scss";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="static-page">
        <h1>About RentEase</h1>
        <p>
          Welcome to RentEase — your trusted platform for booking rental properties across the country.
          Whether you're looking for a weekend getaway, a family vacation, or a long-term stay, RentEase
          connects travelers with verified and comfortable accommodations tailored to their needs.
        </p>
        <p>
          Our mission is to make renting seamless, secure, and affordable. We achieve this by working
          closely with hosts and ensuring that all listings meet our quality and safety standards. Our
          customer support is available 24/7 to help with inquiries, emergencies, or special requests.
        </p>
        <p>
          We believe in empowering both guests and hosts. While guests benefit from flexible choices and
          transparent pricing, hosts enjoy a robust platform to list and manage their properties with ease.
        </p>
        <p>
          RentEase was founded in 2024 by a group of travel enthusiasts and technology experts who
          envisioned a smoother way to find, book, and manage rental stays. With thousands of happy customers,
          we are committed to growing our platform and services every day.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;