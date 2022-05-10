//NPM packages
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import CourseImage from "../assets/course.png";

export default function CourseCard({ item }) {
  const { id, name } = item;

  //Properties
  const navigate = useNavigate();

  return (
    <article className="course-card">
      <Link className="link" to={`course/${id}`}>
        <img src={CourseImage} alt="course" />
        <h3>{name}</h3>
      </Link>
    </article>
  );
}
