import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await api.get("/movies");
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>🎬 Admin Dashboard</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {movies.map(movie => (
          <div key={movie._id} style={{
            background: "#ffffff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
