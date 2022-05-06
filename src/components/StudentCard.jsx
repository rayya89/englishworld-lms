//NPM Packages
import { useState, useEffect } from "react";

//Project files
import { readDocument, deleteDocument } from "../scripts/fireStore";

export default function StudentCard({ item, studentsState }) {
  const { id, studentId } = item;
  const [students, setStudents] = studentsState;

  //Local state
  const [student, setStudent] = useState();
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Method
  useEffect(() => {
    async function loadStudent(path) {
      const studentData = await readDocument(path, studentId).catch(onFail);
      if (studentData) onSuccess(studentData);
    }

    loadStudent("users");
  }, []);

  function onSuccess(studentData) {
    setStudent(studentData);
    setStatus(1);
  }

  function onFail(error) {
    console.error(error);
    alert("We cannot load the student. Try again");
    setStatus(2);
  }

  async function onDelete(id) {
    const deleted = await deleteDocument("enrollments", id).catch(onDeleteFail);
    if (deleted) onDeleteSuccess(id);
  }

  function onDeleteSuccess(id) {
    const filteredStudents = students.filter((item) => item.id !== id);
    setStudents(filteredStudents);
  }

  function onDeleteFail(error) {
    console.error(error);
    alert("Could not delete the course");
  }

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

  return (
    <div>
      <li>
        <span>{student.name}</span>
        <button onClick={() => onDelete(id)}>Delete</button>
      </li>
    </div>
  );
}
