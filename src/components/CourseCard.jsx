//NPM packages
import { useNavigate } from "react-router-dom";

export default function CourseCard({ item }) {
  const { id, name } = item;

  //Properties
  const navigate = useNavigate();

  return (
    <article className="Course-card">
      <h2>{name}</h2>
      <button
        onClick={() => navigate(`course/${id}`)}
        className="button-secondary"
      >
        Course content
      </button>
    </article>
  );
}
