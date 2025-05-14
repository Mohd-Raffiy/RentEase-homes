const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const reportSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ListingSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  type: { type: String, required: true },
  streetAddress: { type: String, required: true },
  aptSuite: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  guestCount: { type: Number, required: true },
  bedroomCount: { type: Number, required: true },
  bedCount: { type: Number, required: true },
  bathroomCount: { type: Number, required: true },
  amenities: { type: Array, default: [] },
  listingPhotoPaths: [{ type: String }],
  title: { type: String, required: true },
  description: { type: String, required: true },
  highlight: { type: String, required: true },
  highlightDesc: { type: String, required: true },
  price: { type: Number, required: true },

  // ✅ New fields:
  reviews: [reviewSchema],
  reports: [reportSchema],
}, { timestamps: true });

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
