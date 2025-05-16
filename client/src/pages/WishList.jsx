import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WishList = () => {
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || []; // ✅ Avoid crash if user is null
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // ✅ Redirect if logged out
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList.map(
          (
            {
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            },
            index
          ) => (
            <ListingCard
              key={index}
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;