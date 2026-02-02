import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

// Note to self: Navbar handles navigation + search input.
export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo">Recipe Discovery</Link>
      <div className="links">
        <Link to="/favorites">Favorites</Link>
      </div>
      <form onSubmit={onSearch} className="search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}
