import { useState } from "react";
import { deleteDocument } from "../scripts/fireStore";
import EditItemContent from "../components/EditItemContent";

export default function AdminFileItem({ item, filesPath, filesState }) {
  const { id, name, link, difficulty } = item;
  const [files, setFiles] = filesState;

  //Local state
  const [showForm, setShowForm] = useState(false);

  //Methods
  async function onDelete(id) {
    const deleted = await deleteDocument(filesPath, id).catch(onFail);
    if (deleted) onSuccess(id);
  }

  function onSuccess(id) {
    const filteredFiles = files.filter((item) => item.id !== id);
    setFiles(filteredFiles);
  }

  function onFail(error) {
    console.error(error);
    alert("Could not delete the file");
  }

  function openForm() {
    setShowForm(true);
  }

  return (
    <div>
      <span>Name:{name}</span>
      <span>Link:{link}</span>
      <span>Level:{difficulty}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={openForm}>Edit</button>
      {openForm && (
        <EditItemContent
          formState={[showForm, setShowForm]}
          item={item}
          path={filesPath}
          contentState={filesState}
        />
      )}
    </div>
  );
}
