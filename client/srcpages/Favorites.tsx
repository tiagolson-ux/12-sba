import { useFavorites } from "../context/FavoritesContext";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

type MealResponse = {
  meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null;
};

// Note to self: Fetch each favorite by id.
export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p style={{ padding: "2rem" }}>No favorites yet. Go add some!</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Favorites</h1>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {favorites.map((id) => (
          <FavoriteCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}

function FavoriteCard({ id }: { id: string }) {
  const { data, loading, error } = useFetch<MealResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  const meal = data?.meals?.[0];
  if (!meal) return null;

  return <RecipeCard id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />;
}
