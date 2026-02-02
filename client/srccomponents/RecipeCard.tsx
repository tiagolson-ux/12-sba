import { Link } from "react-router-dom";
import "../styles/card.css";

type Props = {
  id: string;
  name: string;
  thumb: string;
};

// Note to self: Reusable card for any recipe list.
export default function RecipeCard({ id, name, thumb }: Props) {
  return (
    <Link to={`/recipe/${id}`} className="card">
      <img src={thumb} alt={name} />
      <h3>{name}</h3>
    </Link>
  );
}
