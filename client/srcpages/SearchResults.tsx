import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

// Note to self: search query comes from URL.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type SearchResponse = {
  meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null;
};

export default function SearchResults() {
  const query = useQuery().get("query") || "";
  const { data, loading, error } = useFetch<SearchResponse>(
    query ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}` : null
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Search: {query}</h1>
      {!data?.meals && <p>No results found.</p>}
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {data?.meals?.map((m) => (
          <RecipeCard key={m.idMeal} id={m.idMeal} name={m.strMeal} thumb={m.strMealThumb} />
        ))}
      </div>
    </div>
  );
}
