//NPM files
import { useState, useEffect } from "react";

//Project files
import { readCollection } from "../scripts/fireStore";
import AdminLinkItem from "../components/AdminLinkItem";
import AdminFileItem from "../components/AdminFileItem";
import CreateContentForm from "./CreateContentForm";

export default function EditCourseContent({ courseId, formState }) {
  const [showContent, setShowContent] = formState;

  const path = "courses";
  const linksPath = `${path}/${courseId}/links/`;
  const filesPath = `${path}/${courseId}/files/`;

  //Local state
  const [links, setLinks] = useState([]);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  useEffect(() => {
    async function loadData() {
      const links = await readCollection(linksPath).catch(onFail);
      if (links) setLinks(links);
      const files = await readCollection(filesPath).catch(onFail);
      if (files) setFiles(files);
      setStatus(1);
    }

    loadData();
  }, []);

  function onFail(error) {
    console.error(error);
    alert("We cannot load the categories. Try again");
    setStatus(2);
  }

  function closeForm() {
    setShowContent(false);
  }

  //Safeguard
  if (!showContent) return null;

  //Components
  const LinksList = links.map((item) => (
    <AdminLinkItem
      key={item.id}
      item={item}
      linksPath={linksPath}
      linksState={[links, setLinks]}
    />
  ));
  const FilesList = files.map((item) => (
    <AdminFileItem
      key={item.id}
      item={item}
      filesPath={filesPath}
      filesState={[files, setFiles]}
    />
  ));

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

  return (
    <div>
      <h1>Edit course eductional content</h1>
      <h2>Course links</h2>
      <div>{LinksList}</div>
      <h3>Add Link:</h3>
      <CreateContentForm path={linksPath} state={[links, setLinks]} />
      <h2>Course files</h2>
      <div>{FilesList}</div>
      <h3>Add File:</h3>
      <CreateContentForm path={filesPath} state={[files, setFiles]} />
      <button className="button-secondary" onClick={() => closeForm()}>
        Finish Editing
      </button>
    </div>
  );
}
