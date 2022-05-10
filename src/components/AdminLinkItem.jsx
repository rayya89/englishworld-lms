import { useState } from "react";
import { deleteDocument } from "../scripts/fireStore";
import EditItemContent from "../components/EditItemContent";

export default function AdminLinkItem({ item, linksPath, linksState }) {
  const { id, name, link, difficulty } = item;
  const [links, setLinks] = linksState;

  //Local state
  const [showForm, setShowForm] = useState(false);

  //Methods
  async function onDelete(id) {
    const deleted = await deleteDocument(linksPath, id).catch(onFail);
    if (deleted) onSuccess(id);
  }

  function onSuccess(id) {
    const filteredLinks = links.filter((item) => item.id !== id);
    setLinks(filteredLinks);
  }

  function onFail(error) {
    console.error(error);
    alert("Could not delete the file");
  }

  function openForm() {
    setShowForm(true);
  }

  return (
    <div className="admin-item">
      <span>Name: {name}</span>
      <span>Link: {link}</span>
      <span>Level: {difficulty}</span>
      <button className="button" onClick={() => onDelete(id)}>
        Delete
      </button>
      <button className="button" onClick={openForm}>
        Edit
      </button>
      {openForm && (
        <EditItemContent
          formState={[showForm, setShowForm]}
          item={item}
          path={linksPath}
          contentState={linksState}
        />
      )}
    </div>
  );
}
