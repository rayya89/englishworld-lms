//NPM packages
import { useState } from "react";

//Project files
import form from "../data/contentForm.json";
import InputField from "./InputField";
import { updateDocument } from "../scripts/fireStore";

export default function EditItemContent({
  formState,
  item,
  path,
  contentState,
}) {
  const [showForm, setShowForm] = formState;
  const [value, setValue] = contentState;

  //Localstate
  const [name, setName] = useState(item.name);
  const [link, setLink] = useState(item.link);
  const [difficulty, setDifficulty] = useState(item.difficulty);

  //Methods
  async function onUpdate(event) {
    event.preventDefault();
    const editedItem = {
      id: item.id,
      name: name,
      link: link,
      difficulty: difficulty,
    };
    const updated = await updateDocument(path, editedItem).catch(onFail);
    if (updated) onSuccess(editedItem);
  }

  function onSuccess(editedItem) {
    const clonedItems = [...value];
    const index = clonedItems.findIndex((item) => item.id === editedItem.id);
    clonedItems[index] = editedItem;
    setValue(clonedItems);
    resetForm();
  }

  function onFail(error) {
    console.error(error);
    alert("Could not update the course");
  }

  function resetForm() {
    setName("");
    setLink("");
    setDifficulty("");
    setShowForm(false);
  }

  //Safeguard
  if (!showForm) return null;

  return (
    <div>
      <form className="form" onSubmit={onUpdate}>
        <InputField setup={form.name} state={[name, setName]} />
        <InputField setup={form.link} state={[link, setLink]} />
        <InputField
          setup={form.difficulty}
          state={[difficulty, setDifficulty]}
        />
        <button>Edit</button>
      </form>
    </div>
  );
}
