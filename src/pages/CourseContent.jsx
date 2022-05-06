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

  async function onEnroll() {
    const enrollID = `${courseId}_${uid}`;
    const enrollData = { courseId: courseId, studentId: uid };
    const enrollment = await createDocumentWithId(
      "enrollments",
      enrollID,
      enrollData
    ).catch(onFail);
    if (enrollment) return true;
  }

  //Components
  const LinksList = links.map((item) => <LinkItem key={item.id} item={item} />);
  const FilesList = files.map((item) => <FileItem key={item.id} item={item} />);

  //Safeguard
  if (status === 0) return <p>Loading</p>;
  if (status === 2) return <p>error</p>;

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
