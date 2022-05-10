//NPM packages
import { useState } from "react";

//Project files
import form from "../data/contentForm.json";
import InputField from "./InputField";
import { createDocument } from "../scripts/fireStore";

export default function CreateContentForm({ path, state }) {
  const [getter, setter] = state;

  //Localstate
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [difficulty, setDifficulty] = useState("");

  async function onCreate(event) {
    event.preventDefault();
    let newContent = {
      name: name,
      link: link,
      difficulty: difficulty,
    };
    const createdId = await createDocument(path, newContent).catch(onFail);
    if (createdId) onSuccess(newContent, createdId);
  }

  function onSuccess(newContent, createdId) {
    newContent = { id: createdId, ...newContent };
    setter([...getter, newContent]);
    resetForm();
  }

  function onFail(error) {
    console.error(error);
    alert("Could not create a document.");
  }

  function resetForm() {
    setName("");
    setLink("");
    setDifficulty("");
  }

  return (
    <form className="form" onSubmit={onCreate}>
      <InputField setup={form.name} state={[name, setName]} />
      <InputField setup={form.link} state={[link, setLink]} />
      <InputField setup={form.difficulty} state={[difficulty, setDifficulty]} />
      <button className="button">Add</button>
    </form>
  );
}
