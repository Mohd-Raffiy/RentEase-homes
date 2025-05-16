import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminPanel = () => {
  const [reportedListings, setReportedListings] = useState([]);
  const user = useSelector((state) => state.user);

  const fetchReportedListings = async () => {
    try {
      const res = await fetch("http://localhost:3001/properties/admin/reported");
      const data = await res.json();
      setReportedListings(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this listing?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3001/properties/admin/${id}`, {
        method: "DELETE",
      });
      setReportedListings(reportedListings.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err.message);
    }
  };

  useEffect(() => {
    if (user?.email === "admin@example.com") {
      fetchReportedListings();
    }
  }, [user]);

  if (user?.role !== "admin") {
  return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Access Denied</h2>;
 }


  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h1>🚨 Reported Listings</h1>
        {reportedListings.length === 0 ? (
          <p>No reported listings found.</p>
        ) : (
          reportedListings.map((listing) => (
            <div key={listing._id} style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "20px", borderRadius: "8px" }}>
              <h3>{listing.title}</h3>
              <p><strong>Reports:</strong> {listing.reports.length}</p>
              <ul>
                {listing.reports.map((rep, i) => (
                  <li key={i}>
                    <i>{rep.reason}</i> - {new Date(rep.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
              {listing.reports.length >= 5 && (
                <button
                  onClick={() => handleDelete(listing._id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px"
                  }}
                >
                  DELETE LISTING
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
