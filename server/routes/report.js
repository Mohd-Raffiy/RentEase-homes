// routes/report.js
const express = require("express");
const Report = require("../models/Report.js");

const router = express.Router();

// POST: /api/report/:listingId/report
router.post("/:listingId/report", async (req, res) => {
  const { listingId } = req.params;
  const { reporterId, reason } = req.body;

  try {
    if (!reporterId || !reason) {
      return res.status(400).json({ message: "Missing reporter ID or reason" });
    }

    const newReport = new Report({
      listingId,
      reporterId,
      reason,
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Report submission error:", error.message);
    res.status(500).json({ message: "Server error while submitting report" });
  }
});

module.exports = router;
