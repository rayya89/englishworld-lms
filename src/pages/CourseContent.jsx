//NPM files
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Project files
import {
  readCollection,
  readDocument,
  createDocumentWithId,
} from "../scripts/fireStore";
import LinkItem from "../components/LinkItem";
import FileItem from "../components/FileItem";
import { onFail } from "../scripts/onFail";
import { useUid } from "../state/UidContext";

export default function CourseContent() {
  const { uid } = useUid();
  const { courseId } = useParams();
  const path = "courses";
  const linksPath = `${path}/${courseId}/links/`;
  const filesPath = `${path}/${courseId}/files/`;

  // Local state
  const [course, setCourse] = useState({});
  const [links, setLinks] = useState([]);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  useEffect(() => {
    async function loadData(path) {
      const courseData = await readDocument(path, courseId).catch(onLoadFail);
      if (courseData) setCourse(courseData);
      const links = await readCollection(linksPath).catch(onLoadFail);
      if (links) setLinks(links);
      const files = await readCollection(filesPath).catch(onLoadFail);
      if (files) setFiles(files);
      setStatus(1);
    }

    loadData(path);
  }, []);

  function onLoadFail() {
    onFail();
    setStatus(2);
  }

  // nesting -1, naming -1
  // you dont need to call enrollX, enrollY if the parent function is call Enroll
  // just call then ID and Data and we understand that are related to the enroll
  async function onEnroll() {
    const id = `${courseId}_${uid}`;
    const data = { courseId: courseId, studentId: uid };
    const path = "enrollments";
    const document = await createDocumentWithId(path, id, data).catch(onFail);
    if (document) return true;
  }

  // Excellent !!!
  //Components
  const LinksList = links.map((item) => <LinkItem key={item.id} item={item} />);
  const FilesList = files.map((item) => <FileItem key={item.id} item={item} />);

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

  // Good, clean JSX easy to folow
  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <button onClick={onEnroll}>Enroll</button>
      <h2>Course links</h2>
      <div>{LinksList}</div>
      <h2>Course files</h2>
      <div>{FilesList}</div>
    </div>
  );
}
