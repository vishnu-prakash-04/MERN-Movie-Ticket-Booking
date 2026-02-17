import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await api.get(`/shows/details/${showId}`);
        setShow(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShow();
  }, [showId]);

  if (!show)
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading show details...</h2>
      </div>
    );

  const totalSeats = show.theatre.totalSeats;
  const bookedSeats = show.bookedSeats;

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please login to book seats");
      navigate("/login");
      return;
    }

    if (selectedSeats.length === 0) {
      toast.warning("Please select at least one seat");
      return;
    }

    try {
      await api.post("/bookings", {
        showId,
        seats: selectedSeats,
      });

      toast.success("Booking successful!");

      const response = await api.get(`/shows/details/${showId}`);
      setShow(response.data);
      setSelectedSeats([]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>🎬 Select Your Seats</h2>

      {/* Screen */}
      <div
        style={{
          margin: "20px auto",
          width: "60%",
          padding: "10px",
          background: "#1e293b",
          color: "white",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        SCREEN THIS WAY
      </div>

      {/* Seat Grid */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 50px)",
            gap: "12px",
            marginTop: "30px",
          }}
        >
          {Array.from({ length: totalSeats }, (_, i) => {
            const seatNumber = i + 1;
            const isBooked = bookedSeats.includes(seatNumber);
            const isSelected = selectedSeats.includes(seatNumber);

            return (
              <div
                key={seatNumber}
                onClick={() => handleSeatClick(seatNumber)}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  cursor: isBooked ? "not-allowed" : "pointer",
                  backgroundColor: isBooked
                    ? "#9ca3af"
                    : isSelected
                    ? "#22c55e"
                    : "#ffffff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: "0.3s",
                }}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: "30px" }}>
        <span style={{ marginRight: "20px" }}>
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              background: "#ffffff",
              borderRadius: "6px",
              marginRight: "5px",
              border: "1px solid black",
            }}
          ></span>
          Available
        </span>

        <span style={{ marginRight: "20px" }}>
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              background: "#22c55e",
              borderRadius: "6px",
              marginRight: "5px",
            }}
          ></span>
          Selected
        </span>

        <span>
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              background: "#9ca3af",
              borderRadius: "6px",
              marginRight: "5px",
            }}
          ></span>
          Booked
        </span>
      </div>

      {/* Selected Seats */}
      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Selected Seats: {selectedSeats.join(", ") || "None"}
      </p>

      {/* Book Button */}
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleBooking}
          style={{
            padding: "15px 50px",
            fontSize: "18px",
            borderRadius: "50px",
            border: "none",
            background: "linear-gradient(135deg, #f43f5e, #f97316)",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          🎟 Book Now
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
