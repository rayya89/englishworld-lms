//NPM Packages
import { useState, useEffect } from "react";

// Project files
import { useUser } from "../state/UserContext";
import { useCourses } from "../state/CoursesContext";
import { readCollection } from "../scripts/fireStore";
import CourseCard from "../components/CourseCard";
import { onFail } from "../scripts/onFail";

export default function Dashboard() {
  const { user, setUser } = useUser();
  const { courses, setCourses } = useCourses();

  // Local state
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

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

  // Components
  const CourseCards = courses.map((item) => (
    <CourseCard key={item.id} item={item} />
  ));

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

  return (
    <div className="dashboard">
      <h1>Home</h1>
      <p>Welcome {user.name}! Here are all our courses. Start Learning!</p>
      <div className="cards">{CourseCards}</div>
      <button className="button" onClick={() => setUser(null)}>
        Logout
      </button>
    </div>
  );
}
