//NPM files
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Project files
import { readDocument } from "../scripts/fireStore";
import { onFail } from "../scripts/onFail";
import EditCourseDetails from "../components/EditCourseDetails";
import EditCourseContent from "../components/EditCourseContent";

export default function EditCourse() {
  const { courseId } = useParams();
  const path = "courses";

  // Local state
  const [course, setCourse] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  useEffect(() => {
    async function loadData(path) {
      const courseData = await readDocument(path, courseId).catch(onLoadFail);
      if (courseData) setCourse(courseData);
      setStatus(1);
    }

    loadData(path);
  }, []);

  function onLoadFail() {
    onFail();
    setStatus(2);
  }

  function openForm() {
    setShowForm(true);
  }

  function openContentForm() {
    setShowContent(true);
  }

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

  return (
    <div>
      <h1>Edit {course.name} Course</h1>
      <p>{course.description}</p>
      <button onClick={openForm}>Edit course details</button>
      {openForm && (
        <EditCourseDetails
          formState={[showForm, setShowForm]}
          courseState={[course, setCourse]}
          courseId={courseId}
        />
      )}
      <button onClick={openContentForm}>Edit course content</button>
      {openContentForm && (
        <EditCourseContent
          courseId={courseId}
          formState={[showContent, setShowContent]}
        />
      )}
    </div>
  );
}
