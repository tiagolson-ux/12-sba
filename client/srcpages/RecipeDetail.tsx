import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";

// Note to self: TheMealDB returns meals array.
type MealDetailResponse = {
  meals: Record<string, string>[] | null;
};

export default function RecipeDetail() {
  const { id } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const { data, loading, error } = useFetch<MealDetailResponse>(
    id ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : null
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meal = data?.meals?.[0];
  if (!meal) return <ErrorMessage message="Recipe not found." />;

  const fav = isFavorite(meal.idMeal);

  // Note to self: Build ingredients list from API keys.
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ing = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ing ? `${measure} ${ing}` : null;
  }).filter(Boolean);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={{ maxWidth: "400px" }} />
      <button onClick={() => (fav ? removeFavorite(meal.idMeal) : addFavorite(meal.idMeal))}>
        {fav ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item) => (
          <li key={item as string}>{item}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{meal.strInstructions}</p>
    </div>
  );
}
