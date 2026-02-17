import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function MovieDetails() {
  const { id } = useParams();
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await api.get(`/shows/${id}`);
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, [id]);

  return (
  <div style={{ textAlign: "center" }}>
    <h2 style={{ marginBottom: "30px" }}>🎟 Available Shows</h2>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "25px",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        {shows.map((show) => (
          <div
            key={show._id}
            onClick={() => navigate(`/show/${show._id}`)}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "0.3s",
              textAlign: "left",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h3>🎥 {show.theatre.name}</h3>
            <p>🕒 {new Date(show.showTime).toLocaleString()}</p>
            <p>💰 ₹{show.ticketPrice}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default MovieDetails;
