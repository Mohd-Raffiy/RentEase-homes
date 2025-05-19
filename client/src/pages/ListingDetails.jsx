import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import ReactStars from "react-rating-stars-component";


const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        { method: "GET" }
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmitReview = async (e) => {
  e.preventDefault();
  const res = await fetch(`http://localhost:3001/properties/${listingId}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, rating, comment }),
  });
  if (res.ok) {
    setComment("");
    setRating(5);
    getListingDetails(); // refresh listing
  }
};

const handleReport = async (e) => {
  e.preventDefault();
  const res = await fetch(`http://localhost:3001/api/report/${listingId}/report`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ reporterId: customerId, reason }),
});

  if (res.ok) {
    setReason("");
    alert("Report submitted");
  }
};



  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) || 1;

  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();

  const handlePayment = () => {
  if (!customerId) {
    // Redirect to login if user not logged in
    navigate("/login", {
      state: {
        from: `/listing/${listingId}`, // optional: for redirecting back after login
      },
    });
    return;
  }

  navigate("/payment", {
    state: {
      bookingForm: {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      },
      listing,
      dayCount,
    },
  });
};


  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="host"
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {facilities.find((facility) => facility.name === item)?.icon}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              <h2>
                ₹{listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
              </h2>
              <h2>Total price: ₹{listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="button" onClick={handlePayment}>
                CONTINUE TO PAYMENT
              </button>
            </div>
          </div>
        </div>
        <div className="review-section">
            <hr />
            <h2>⭐ Reviews</h2>

            {listing.reviews?.length ? (
              listing.reviews.map((rev, idx) => (
                <div className="review-card" key={idx}>
                  <ReactStars
                    value={rev.rating}
                    count={5}
                    size={30} // still large
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p>{rev.comment}</p>
                  <p><i>{new Date(rev.date).toDateString()}</i></p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}

            {customerId && (
              <form onSubmit={handleSubmitReview}>
                <h3>Leave a Review</h3>
                <ReactStars
                  value={rating}
                  count={5}
                  onChange={(e) => setRating(e)}
                  size={40}
                  activeColor="#ffd700"
                  classNames="rating-stars"
                />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your review"
                  required
                />
                <button type="submit">Submit Review</button>
              </form>
            )}

            <hr />
            <h2>⚠️ Report Listing</h2>
            {customerId && (
              <form onSubmit={handleReport}>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for reporting"
                  required
                />
                <button type="submit">Report</button>
              </form>
            )}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
