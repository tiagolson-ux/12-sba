import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

type MealsResponse = {
  meals: { idMeal: string; strMeal: string; strMealThumb: string }[];
};

// Note to self: Category fetches meals by name from URL params.
export default function Category() {
  const { name } = useParams();
  const { data, loading, error } = useFetch<MealsResponse>(
    name ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}` : null
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{name} Recipes</h1>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {data?.meals?.map((m) => (
          <RecipeCard key={m.idMeal} id={m.idMeal} name={m.strMeal} thumb={m.strMealThumb} />
        ))}
      </div>
    </div>
  );
}
