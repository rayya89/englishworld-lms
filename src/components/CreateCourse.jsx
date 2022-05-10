//NPM packages
import { useState } from "react";

//Project files
import { useCourses } from "../state/CoursesContext";
import { createDocument } from "../scripts/fireStore";
import form from "../data/courseForm.json";
import InputField from "../components/InputField";

export default function CreateCourse({ formState }) {
  const { courses, setCourses } = useCourses();
  const [showForm, setShowForm] = formState;

  //Localstate
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function onCreate(event) {
    event.preventDefault();
    let newCourse = {
      name: name,
      description: description,
    };
    const createdId = await createDocument("courses", newCourse).catch(onFail);
    if (createdId) onSuccess(newCourse, createdId);
  }

  function onSuccess(newCourse, createdId) {
    newCourse = { id: createdId, ...newCourse };
    setCourses([...courses, newCourse]);
    resetForm();
  }

  function onFail(error) {
    console.error(error);
    alert("Could not create a document.");
  }

  function resetForm() {
    setName("");
    setDescription("");
    setShowForm(false);
  }

  //Safeguard
  if (!showForm) return null;

  return (
    <form className="form" onSubmit={onCreate}>
      <h2>Add Course</h2>
      <InputField setup={form.name} state={[name, setName]} />
      <InputField
        setup={form.description}
        state={[description, setDescription]}
      />
      <button className="button-secondary">Add course</button>
    </form>
  );
}
