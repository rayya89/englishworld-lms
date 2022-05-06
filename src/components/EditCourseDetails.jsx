//NPM packages
import { useState } from "react";

//Project files
import { updateDocument } from "../scripts/fireStore";
import form from "../data/courseForm.json";
import InputField from "../components/InputField";

export default function EditCourseDetails({
  formState,
  courseState,
  courseId,
}) {
  const [showForm, setShowForm] = formState;
  const [course, setCourse] = courseState;

  //Localstate
  const [name, setName] = useState(course.name);
  const [description, setDescription] = useState(course.description);

  async function onUpdate(event) {
    event.preventDefault();
    const editedCourse = {
      id: courseId,
      name: name,
      description: description,
    };
    const updated = await updateDocument("courses", editedCourse).catch(onFail);
    if (updated) onSuccess(editedCourse);
  }

  function onSuccess(editedCourse) {
    setCourse(editedCourse);
    resetForm();
  }

  function onFail(error) {
    console.error(error);
    alert("Could not update the course");
  }

  function resetForm() {
    setName("");
    setDescription("");
    setShowForm(false);
  }

  //Safeguard
  if (!showForm) return null;

  return (
    <form className="form" onSubmit={onUpdate}>
      <h2>Update Course</h2>
      <InputField setup={form.name} state={[name, setName]} />
      <InputField
        setup={form.description}
        state={[description, setDescription]}
      />
      <button>Update Course</button>
    </form>
  );
}
