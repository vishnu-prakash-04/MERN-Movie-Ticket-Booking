import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/show/:showId" element={<SeatSelection />} />
      <Route path="/admin" element={<AdminDashboard />} />

    </Routes>
    </Layout>
  );
}

export default App;
