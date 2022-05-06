//NPM Packages
import { useState, useEffect } from "react";

// Project files
import { useUser } from "../state/UserContext";
import { readCollection } from "../scripts/fireStore";
import CourseCard from "../components/CourseCard";
import { onFail } from "../scripts/onFail";

export default function Dashboard() {
  const { user, setUser } = useUser();

  // Local state
  const [courses, setCourses] = useState([]);
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
    <div>
      <h1>Home</h1>
      <p>Welcome {user.name}! Here are all our courses. Start Learning!</p>
      <div className="grid">{CourseCards}</div>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}
