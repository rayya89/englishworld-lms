//NPM packages
import { useNavigate } from "react-router-dom";
import { useCourses } from "../state/CoursesContext";
import { deleteDocument } from "../scripts/fireStore";

export default function AdminCourseCard({ item }) {
  const { id, name } = item;
  const { courses, setCourses } = useCourses();

  //Properties
  const navigate = useNavigate();

  // Methods
  async function onDelete(id) {
    const deleted = await deleteDocument("courses", id).catch(onFail);
    if (deleted) onSuccess(id);
  }

  function onSuccess(id) {
    const filteredCourses = courses.filter((item) => item.id !== id);
    setCourses(filteredCourses);
  }

  function onFail(error) {
    console.error(error);
    alert("Could not delete the course");
  }

  return (
    <article className="course-card">
      <h2>{name}</h2>
      <div className="options">
        <button
          onClick={() => navigate(`edit-course/${id}`)}
          className="button"
        >
          Edit course
        </button>
        <button className="button" onClick={() => onDelete(id)}>
          Delete Course
        </button>
        <button
          onClick={() => navigate(`participants/${id}`)}
          className="button"
        >
          Show participants
        </button>
      </div>
    </article>
  );
}
