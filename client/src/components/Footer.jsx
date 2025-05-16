import "../styles/Footer.scss"
import { LocalPhone, Email } from "@mui/icons-material"
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/"><img src="/assets/logo.png" alt="logo" /></a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          <li><Link to="/refund-policy">Refund & Return Policy</Link></li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+1 234 567 890</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>rentease@support.com</p>
        </div>
      </div>
    </div>
  )
}

export default Footer