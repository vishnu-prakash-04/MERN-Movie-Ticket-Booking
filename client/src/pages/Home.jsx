import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
  <div style={{ textAlign: "center" }}>
    <h1 style={{ marginBottom: "30px" }}>🎬 Movies</h1>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie._id}
            onClick={() => navigate(`/movie/${movie._id}`)}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h2>{movie.title}</h2>
            <p>{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default Home;
