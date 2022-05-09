//NPM files
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//Project files
import { getStudentIdByCourse } from "../scripts/fireStore";
import StudentCard from "../components/StudentCard";

export default function CourseParticipants() {
  //Properties
  const { courseId } = useParams();
  const emptyMessage = "No student is enrolled in this Course";

  // Local state
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Method
  useEffect(() => {
    async function loadData(path) {
      const students = await getStudentIdByCourse(path, courseId).catch(onFail);
      if (students) onSuccess(students);
    }

    loadData("enrollments");
  }, []);

  function onSuccess(students) {
    setStudents(students);
    setStatus(1);
  }

  function onFail(error) {
    console.error(error);
    alert("We cannot load the participants. Try again");
    setStatus(2);
  }

  // Components
  // Nesting -1, you can call it just "state" instead of stundet state.
  const StudentCards = students.map((item) => (
    <StudentCard key={item.id} item={item} state={[students, setStudents]} />
  ));

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

  return (
    <div>
      <h1>Course Participants</h1>
      <p>
        Here you can find all the students in this course. Feel free to delete
        anyone of them.
      </p>
      <ul>
        {students.length === 0 && emptyMessage}
        {students.length > 0 && StudentCards}
      </ul>
    </div>
  );
}
