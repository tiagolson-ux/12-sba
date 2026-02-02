import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import "../styles/page.css";

type CategoriesResponse = {
  categories: { idCategory: string; strCategory: string; strCategoryThumb: string }[];
};

// Note to self: Home shows all categories.
export default function Home() {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <h1 className="section-title">Categories</h1>
      <div className="grid">
        {data?.categories.map((cat) => (
          <Link key={cat.idCategory} to={`/category/${cat.strCategory}`}>
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
            <p>{cat.strCategory}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

