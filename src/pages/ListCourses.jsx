//NPM Packages
import { useState, useEffect } from "react";

// Project files
import { readCollection } from "../scripts/fireStore";
import { onFail } from "../scripts/onFail";
import CourseCard from "../components/AdminCourseCard";
import { useUser } from "../state/UserContext";
import { useCourses } from "../state/CoursesContext";
import CreateCourse from "../components/CreateCourse";

export default function ListCourses() {
  const { courses, setCourses } = useCourses();
  const emptyMessage = "No courses is added. Start by adding the first course";

  // Local state
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error
  const { user, setUser } = useUser();
  const [showForm, setShowForm] = useState(false);

  // Method
  useEffect(() => {
    async function loadData(path) {
      const courseData = await readCollection(path).catch(onLoadFail);
      if (courseData) onSuccess(courseData);
    }

    loadData("courses");
  }, []);

  function onSuccess(courseData) {
    setCourses(courseData);
    setStatus(1);
  }

  function onLoadFail() {
    onFail();
    setStatus(2);
  }

  function openForm() {
    setShowForm(true);
  }

  // Components
  const CourseCards = courses.map((item) => (
    <CourseCard key={item.name} item={item} />
  ));

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

  return (
    <div className="list-courses">
      <h1>Admin Platform</h1>
      <p>Welcome {user.name}!</p>
      <p>CHOOSE A COURSE TO EDIT</p>
      <div className="cards">
        {courses.length === 0 && emptyMessage}
        {courses.length > 0 && CourseCards}
      </div>
      <button className="button-secondary" onClick={openForm}>
        Add a new course
      </button>
      {openForm && <CreateCourse formState={[showForm, setShowForm]} />}
      <button className="button" onClick={() => setUser(null)}>
        Logout
      </button>
    </div>
  );
}
