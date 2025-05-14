import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    profileImage: null,
  });

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSendOTP = async () => {
    if (!formData.mobileNumber) {
      alert("Please enter a mobile number.");
      return;
    }
    try {
      await fetch("http://localhost:3001/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: formData.mobileNumber }),
      });
      alert("OTP sent successfully (check console on server)!");
      setStep(2);
    } catch (err) {
      console.log("OTP sending failed", err.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: formData.mobileNumber,
          otp,
        }),
      });
      if (res.ok) {
        setIsVerified(true);
        alert("Mobile number verified!");
        setStep(3);
      } else {
        alert("Invalid OTP!");
      }
    } catch (err) {
      console.log("OTP verification failed", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify your mobile number before registering.");
      return;
    }

    try {
      const register_form = new FormData();
      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                placeholder="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={handleSendOTP}>
                SEND OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="button" onClick={handleVerifyOTP}>
                VERIFY OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
              />
              <input
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                required
              />
              {!passwordMatch && (
                <p style={{ color: "red" }}>Passwords are not matched!</p>
              )}
              <input
                id="image"
                type="file"
                name="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
                required
              />
              <label htmlFor="image">
                <img src="/assets/addImage.png" alt="add profile photo" />
                <p>Upload Your Photo</p>
              </label>
              {formData.profileImage && (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="profile"
                  style={{ maxWidth: "80px" }}
                />
              )}
              <button type="submit" disabled={!passwordMatch}>
                REGISTER
              </button>
            </>
          )}
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
